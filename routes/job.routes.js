import { Router } from 'express'
const router = Router()

import {
  getAllJobs,
  createJob,
  getJob, 
  updateJob, 
  deleteJob,
  showStats,
} from '../controllers/job.controller.js'
import { validateIdParam, validateJobInput } from '../middleware/validationMiddleware.js'
import { validateOwnershipOrAdmin } from '../middleware/validateOwnershipOrAdmin.js'
import { checkForTestUser } from '../middleware/authMiddleware.js'


//ROUTES:
router.route('/')
        .get(getAllJobs)
        .post(checkForTestUser, validateJobInput, createJob)


router.route('/stats')
        .get(showStats)

        
router.route('/:id')
        .get(validateIdParam, validateOwnershipOrAdmin, getJob)
        .patch(checkForTestUser, validateJobInput, validateIdParam, validateOwnershipOrAdmin, updateJob)
        .delete(checkForTestUser, validateIdParam, validateOwnershipOrAdmin, deleteJob)


export default router