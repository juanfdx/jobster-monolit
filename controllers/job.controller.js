import Job from '../models/Job.js'
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';
import mongoose from 'mongoose';
import day from 'dayjs';


/*===========================================================
  GET ALL JOBS
============================================================*/
export const getAllJobs = async (req, res) => {
  
  /* --- Get all jobs created by specific user "without" query parameters --- */
  // const jobs = await Job.find({ createdBy: req.user.userId });

  const { search, jobStatus, jobType, sort } = req.query;

  //if user role is admin, then shows all jobs, so (no createdBy prop added to queryObject)
  let queryObject = {};

  //if user role is user, then only shows jobs created by specific user
  if (req.user.role === 'user') {
    queryObject = {
      createdBy: req.user.userId
    };
  }
  
  //if search exists, then add it to the query object
  if (search) {
    // search for any letter that matches the position or company, 'i' don't care about font size
    queryObject.$or = [
      { position: { $regex: search, $options: 'i' } }, 
      { company: { $regex: search, $options: 'i' } },
    ] 
  }

  //if jobStatus exists and is not equal to 'all', then add it to the query object
  if (jobStatus && jobStatus !== 'all') {
    queryObject.jobStatus = jobStatus;
  }

  //if jobType exists and is not equal to 'all', then add it to the query object
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType;
  }

  //sort (syntax for mongodb)
  const sortOptions = {
    newest: '-createdAt', //DESC
    oldest: 'createdAt',  //ASC
    'a-z': 'position',    //start by a to z character
    'z-a': '-position',   //start by z to a character
  };

  //if sort param doesn't exist, then use default sortOption (sortOptions.newest) 
  const sortKey = sortOptions[sort] || sortOptions.newest;

  /* --- Setup Pagination --- */
  const page = Number(req.query.page) || 1; //number of pages, is a string, then we need to convert it to number
  const limit = Number(req.query.limit) || 10; 
  const skip = (page - 1) * limit;// skip 10, 20 ... depending on page number got from req.query.page
  
  /* --- Get all jobs created by specific user "with" query parameters --- */
  const jobs = await Job.find(queryObject)
                          .sort(sortKey)
                          .skip(skip)
                          .limit(limit);

  /* --- get total jobs --- */
  const totalJobs = await Job.countDocuments(queryObject);
  /* --- get number of pages --- */
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ 
    totalJobs,
    numOfPages,
    currentPage: page,
    jobs 
  });
  
}


/*===========================================================
  CREATE A NEW JOB
============================================================*/
export const createJob = async  (req, res) => {
  
  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });

}


/*===========================================================
  GET ONE JOB
============================================================*/
export const getJob = async (req, res) => {
  //get user id from request and the job id from request params
  // const {user: {userId}, params: {id: jobId}} = req;
  const { id } = req.params;

  const job = await Job.findById(id);

  if (!job) throw new NotFoundError(`no job with id ${id}`);
  
  res.status(StatusCodes.OK).json({ job });

}


/*===========================================================
  UPDATE JOB - validators are in schema in Job.js
============================================================*/
export const updateJob = async (req, res) => {

  const { id } = req.params;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
  
  if (!updatedJob) throw new NotFoundError(`no job with id ${id}`);

  res.status(StatusCodes.OK).json({ msg: 'job modified', updatedJob });

}


/*===========================================================
  DELETE JOB
============================================================*/
export const deleteJob = async  (req, res) => {

  const { id } = req.params;

  const removedJob = await Job.findByIdAndDelete(id);
 
  if (!removedJob) throw new NotFoundError(`no job with id ${id}`);

  res.status(StatusCodes.OK).json({ msg: 'job deleted', job: removedJob });

}


/*===========================================================
  SHOW STATS
============================================================*/
export const showStats = async (req, res) => {
  
  let stats = await Job.aggregate([
    //grab all jobs that belong to this userId
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    //group by jobStatus
    { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
  ]);

  //turn stats array into an object
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});


  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0
  }
  
  //send last 6 months stats
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },//sort last month first, to set limit from last 6 month
    { $limit: 6 },
  ]);


  monthlyApplications = monthlyApplications.map((item) => {
    const { _id: { year, month }, count } = item;

    const date = day().month(month - 1)//dayjs month start from 0
                      .year(year)
                      .format('MMM YY');
    return { date, count };
  })
  .reverse();//to return latest month last
  

  res.status(StatusCodes.OK).json({
    defaultStats, 
    monthlyApplications
  });
}