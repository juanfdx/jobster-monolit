import { body, param, validationResult } from 'express-validator'
import { BadRequestError } from '../errors/customErrors.js'
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js'
import mongoose from 'mongoose'


const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error, i) => i == 0 ? error.msg : ' ' + error.msg)
        throw new BadRequestError(errorMessages)
      }
      next()
    }
  ]

}

//JOBS: validate
export const validateJobInput = withValidationErrors([
  body('company').notEmpty().withMessage('company is required'),
  body('position').notEmpty().withMessage('position is required'),
  body('jobLocation').notEmpty().withMessage('job location is required'),
  body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('invalid status value'),
  body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid job type'),
]);

export const validateIdParam = withValidationErrors([
  param('id').isMongoId().withMessage('id is not a valid mongo id'),
  //same but manually
  // param('id').custom((value) => mongoose.Types.ObjectId.isValid(value)).withMessage('id is not a valid')
])

//USERS: validate
export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email').notEmpty().withMessage('email is required')
    .isEmail().withMessage('invalid email format'),
  body('password').notEmpty().withMessage('password is required')
    .isLength({min: 8}).withMessage('password must be at least 8 characters long'),
  body('lastName').notEmpty().withMessage('last name is required'),
  body('location').notEmpty().withMessage('location is required'),
]);

export const validateLoginInput = withValidationErrors([
  body('email').notEmpty().withMessage('email is required')
    .isEmail().withMessage('invalid email format'),
  body('password').notEmpty().withMessage('password is required'),
]);

export const validateUpdateUserInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email').notEmpty().withMessage('email is required')
    .isEmail().withMessage('invalid email format'),
  body('lastName').notEmpty().withMessage('last name is required'),
  body('location').notEmpty().withMessage('location is required'),
]);