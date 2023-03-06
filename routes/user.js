import { Router } from 'express'
import {
  authWithGoogle,
  loginUser,
  registerUser,
  renew,
  verifyUser
} from '../controllers/user.js'
import { verifiedAccount } from '../middlewares/verifiedAccount.js'
import { verifyJwt } from '../middlewares/verifyJwt.js'
import {
  validationAutWithGoogle,
  validationLogin,
  validationRegister,
  validationVerifyAccount
} from '../validations/userValidations.js'

// route /api/user
const router = Router()

router.post('/', [validationLogin, verifiedAccount], loginUser)
router.post('/register', validationRegister, registerUser)
router.post('/auth-google', validationAutWithGoogle, authWithGoogle)
router.get('/verify-account', validationVerifyAccount, verifyUser)
router.get('/renew', verifyJwt, renew)

export default router
