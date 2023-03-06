import { request, response } from 'express'
import jwt from 'jsonwebtoken'
import { handleErrorResponse } from '../utils/handleErrors.js'

export const verifyJwt = (req = request, res = response, next) => {
  const authotization = req.headers.authorization
  try {
    const [bearer, token] = authotization?.split(' ')

    if (bearer !== 'Bearer' || !token) {
      return res.status(401).json({
        ok: true,
        msg: 'header authorization invalid'
      })
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const userPayload = {
      id: payload.id,
      username: payload.username,
      photo_url: payload.photo_url
    }
    req.user = userPayload
  } catch (error) {
    handleErrorResponse()
  }
  next()
}
