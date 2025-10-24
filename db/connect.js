import mongoose from 'mongoose'


export const dbConnection = async () => {
  try {
    
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log('DB Online');
    
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}