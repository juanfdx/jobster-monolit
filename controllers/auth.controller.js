import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors/customErrors.js';
import { comparePassword, hashPassword } from '../utils/passwordUtils.js';
import { createJWT } from '../utils/tokenUtils.js';



/*===========================================================
  REGISTER
============================================================*/
export const register = async (req, res) =>  {
  //Initially when register, the user will not have an image
  const { email, password } = req.body;

  const userDB = await User.findOne({ email });

  if (userDB) throw new BadRequestError(`email already exists`);

  //make first registered user the only admin
  const isFirstAccount = await User.countDocuments({}) === 0; //true for the first account
  req.body.role = isFirstAccount ? 'admin' : 'user'; //add role prop to req.body

  //password hashing
  const hashedPassword = await hashPassword(password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);

  res.status(StatusCodes.CREATED).json({ msg: 'user created' });

};


/*===========================================================
  LOGIN
============================================================*/
export const login = async (req, res) => {
  
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // if (!user) throw new UnauthenticatedError('this email is not registered');
  // const match = await comparePassword(password, user.password);
  // if (!match) throw new UnauthenticatedError('invalid password');

  //in case to throw one error for both cases
  const isValidUser = user &&  await comparePassword(password, user.password);

  if (!isValidUser) throw new UnauthenticatedError('invalid credentials');

  const token = createJWT({ userId: user._id, role: user.role });  

  //create the cookie
  const lifeTime = 1000 * 60 * 60 * 12 //12 hours
  res.cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + lifeTime) });

  res.status(StatusCodes.OK).json({msg: 'user logged in'});

}


/*===========================================================
  LOG OUT
============================================================*/
export const logout = (req, res) => {
  //clear the cookie and make it expires immediately
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
}