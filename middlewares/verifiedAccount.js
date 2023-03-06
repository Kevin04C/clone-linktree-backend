import { request, response } from 'express'
import { User } from '../models/User.js'
import { sendEmail } from '../services/sendEmail.js'
import { handleErrorResponse } from '../utils/handleErrors.js'

export const verifiedAccount = async (req = request, res = response, next) => {
  const { username } = req.body
  try {
    const user = await User.findUsername(username)
    if (!user) {
      return res.status(401).json({
        ok: false,
        msg: 'username or password incorrect'
      })
    }
    if (user.verify === 0) {
      sendEmail(user)
      req.user = user
      return res.status(401).json({
        ok: false,
        msg: 'account is not verify, we have send an email to verify'
      })
    }
  } catch (error) {
    return handleErrorResponse(res)
  }
  next()
}
