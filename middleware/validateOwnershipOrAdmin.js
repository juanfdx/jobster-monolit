import Job from '../models/Job.js';
import { NotFoundError, UnauthorizedError } from '../errors/customErrors.js';



export const validateOwnershipOrAdmin = async (req, res, next) => {

  const { id } = req.params;

  const job = await Job.findById(id);

  if (!job) throw new NotFoundError(`no job with id ${id}`);

  if (req.user.role !== 'admin' && job.createdBy.toString() !== req.user.userId) {
    throw new UnauthorizedError('you are not authorized to perform this action');
  }

  next();

}