import dotenv from 'dotenv'//put in the first line !important
dotenv.config()
import 'express-async-errors'
import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cloudinary from 'cloudinary';
//security, do it before build
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
//db folder
import { dbConnection } from './db/connect.js'
//middleware folder
import { authenticateUser } from './middleware/authMiddleware.js'
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js'
//routes
import jobRouter from './routes/job.routes.js'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
//public directory
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express()


//UTILITIES:
//use only morgan in development mode
if (process.env.NODE_ENV === 'development') { app.use(morgan('dev'));}

//MIDDLEWARES:
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, './public')));// important for Deploy
app.use(helmet());
app.use(mongoSanitize());

//CLOUDINARY
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


//DB CONNECTION
dbConnection();


//ROUTES:
app.use('/api/v1/jobs', authenticateUser, jobRouter)
app.use('/api/v1/users', authenticateUser, userRouter)
app.use('/api/v1/auth', authRouter)

// WHEN DEPLOY
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'));
})

//ERRORS ROUTE:
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Not found' });
});
//ERROR HANDLER:
app.use(errorHandlerMiddleware);


//DEPLOY
const port = process.env.PORT || 3000;

app.listen( port, () => {
  console.log(`Server is listen on port ${port}...`);
});
