import { request, response } from 'express'
import { User } from '../models/User.js'
import { handleErrorResponse } from '../utils/handleErrors.js'
import { sendEmail } from '../services/sendEmail.js'
import { comparePassword, encryptPassword } from '../utils/bycript.js'
import { SecurityUsers } from '../models/SecurityUsers.js'
import { generateJwt } from '../utils/jwt.js'
import { verifyUserGoogle } from '../helpers/verifyUserGoogle.js'

export const registerUser = async (req = request, res = response) => {
  const { username, email, password } = req.body
  try {
    const userFind = await User.findByEmail(email)

    if (userFind) {
      return res.status(401).json({
        ok: false,
        message: 'already exists account with that email'
      })
    }
    if (userFind?.username === username) {
      return res.status(401).json({
        ok: false,
        message: 'already exists account with that username'
      })
    }

    const passwordEncryted = encryptPassword(password)
    let user = new User(username, email, passwordEncryted)
    await user.save()
    user = await User.findByEmail(user.email)
    await sendEmail(user)
    res.status(201).json({
      ok: true,
      message: 'We have sent an email for verify your account'
    })
  } catch (error) {
    handleErrorResponse()
  }
}
export const loginUser = async (req = request, res = response) => {
  const { password } = req.body
  const user = req.user

  try {
    if (!user) {
      return res.status(401).json({
        ok: false,
        msg: 'Error email or password incorrect'
      })
    }
    const passwordCompare = comparePassword(password, user.password)
    if (!passwordCompare) {
      return res.status(401).json({
        ok: false,
        msg: 'Error email or password incorrect'
      })
    }
    const payload = {
      id: user.id,
      username: user.username,
      photo_url: user.photo_url
    }
    const token = generateJwt(payload)

    res.json({
      ok: true,
      user: payload,
      token
    })
  } catch (error) {
    handleErrorResponse()
  }
}

export const verifyUser = async (req = request, res = response) => {
  const { token } = req.query
  try {
    const user = await User.find({ column: token, value: token })

    if (user?.token !== token) {
      return res.status(401).json({
        ok: false,
        msg: 'the token is not the same as the user'
      })
    }
    await SecurityUsers.update({
      ...user,
      token: null,
      verify: 1
    })

    res.json({
      ok: true
    })
  } catch (error) {
    handleErrorResponse()
  }
}

export const authWithGoogle = async (req = request, res = response) => {
  const credential = req.body.credential

  try {
    const { username, email } = await verifyUserGoogle(credential)

    let user = await User.findByEmail(email)

    if (!user) {
      user = new User(username, email, ':p')
      await user.save()
      user = await User.findUsername(user.username)
    }
    const payload = {
      id: user.id,
      username: user.username,
      photo_url: user.photo_url
    }
    const token = generateJwt(payload)

    res.status(201).json({
      ok: true,
      user: payload,
      token
    })
  } catch (error) {
    handleErrorResponse()
  }
}

export const renew = (req = request, res = response) => {
  const user = req.user
  try {
    const token = generateJwt(user)
    res.json({
      ok: true,
      user,
      token
    })
  } catch (error) {
    handleErrorResponse()
  }
}
