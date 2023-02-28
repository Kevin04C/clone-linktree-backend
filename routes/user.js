import { Router } from 'express'
import { loginUser, registerUser, renew } from '../controllers/user.js'
import { validationRegisterUser } from '../validations/userValidations.js'

// route /api/user

const router = Router()

router.post('/', loginUser)
router.post('/register', validationRegisterUser, registerUser)
router.get('/renew', renew)

export default router
