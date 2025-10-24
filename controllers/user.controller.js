import User from '../models/User.js';
import Job from '../models/Job.js'
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/customErrors.js';
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';



/*===========================================================
  GET CURRENT USER
============================================================*/
export const getCurrentUser = async (req, res) => {

  const user = await User.findOne({ _id: req.user.userId });

  const userWithoutPassword = user.toJSON();//form User.js L30

  res.status(StatusCodes.OK).json({ user: userWithoutPassword });

}


/*===========================================================
  GET APPLICATION STATS
============================================================*/
export const getApplicationStats = async (req, res) => {

  const users = await User.countDocuments();
  
  const jobs = await Job.countDocuments();

  res.status(StatusCodes.OK).json({ users, jobs });

}


/*===========================================================
  UPDATE USER
============================================================*/
export const updateUser = async (req, res) => {

  const newUser = { ...req.body };

  delete newUser.password;

  //with multer middleware applied on "/update-user" route we have access to req.file at user.routes.js L14
  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: 'users'
    });//save img to cloudinary
    await fs.unlink(req.file.path);//remove temp img
    newUser.avatar = response.secure_url;//for mongodb
    newUser.avatarPublicId = response.public_id;
  }

  const {user: {userId}, body: {email}} = req;

  const user = await User.findOne({ email });
  //check if email is already taken by another user
  if (user && user._id.toString() !== userId) {
    throw new BadRequestError(`email already exists`);
  }

  const updatedUser = await User.findByIdAndUpdate(userId, newUser);

  //if exits a file in req.file and the user has an old img, remove old cloudinary image
  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ msg: 'user updated'});

}