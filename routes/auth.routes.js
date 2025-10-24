import { Router } from 'express'
const router = Router()

import { login, logout, register } from '../controllers/auth.controller.js'
import { validateLoginInput, validateRegisterInput } from '../middleware/validationMiddleware.js'
//security
import rateLimiter from 'express-rate-limit';

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15,
  message: { msg: 'IP rate limit exceeded, retry in 15 minutes.' },
});


//ROUTES:
router.post('/register', apiLimiter, validateRegisterInput, register)
router.post('/login', apiLimiter, validateLoginInput, login)
router.get('/logout', logout)




export default router
