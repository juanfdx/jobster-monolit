import { BadRequestError, UnauthenticatedError, UnauthorizedError } from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';



export const authenticateUser = (req, res, next) => {

  const { token } = req.cookies;

  if (!token) throw new UnauthenticatedError('authentication invalid');

  //verify if token is token is valid
  try {
    const { userId, role } = verifyJWT(token)
    const testUser = userId === '6639f9228b8f068f6e4101b0'; //the id of the test user in db, is boolean
    //we add property user to req (now we have req.user in the req) 
    req.user = { userId, role, testUser };
    next()
    
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid');
  }
  
}


export const authorizePermissions = (...roles) => {
  return (req, res, next) => {

    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('unauthorized to perform this action');
    }
    next();
  }
}


export const checkForTestUser = (req, res, next) => {
  //if testUser is true, badRequest Error will be thrown
  if (req.user.testUser) {
    throw new BadRequestError('Demo User. Read Only!');
  }
  next();
};