import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Job from './models/Job.js';
import User from './models/User.js';

//to populate db with mock data, createdBy testUser or john 
try {
  await mongoose.connect(process.env.DB_CONNECTION);
  const user = await User.findOne({ email: 'john@email.com' });
  // const user = await User.findOne({ email: 'test@test.com' });

  const jsonJobs = JSON.parse(
    await readFile(new URL('./utils/mockData.json', import.meta.url))
  );
  //add createdBy property to each job from jobs list
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id };
  });
  //delete all jobs created by this user, if jobs already exist in db (clear db)
  await Job.deleteMany({ createdBy: user._id });
  //inject jobs in db
  await Job.create(jobs);
  console.log('Success!!!');
  process.exit(0);

} catch (error) {
  console.log(error);
  process.exit(1);
}


//to run populate.js write: node populate