import { request, response } from 'express'

export const registerUser = (req = request, res = response) => {
  const { username, email, password } = req.body

  res.json({
    ok: true,
    msg: 'register user',
    username,
    email,
    password
  })
}
export const loginUser = (req = request, res = response) => {
  res.json({
    ok: true,
    msg: 'register user'
  })
}
export const renew = (req = request, res = response) => {
  res.json({
    ok: true,
    msg: 'rewew'
  })
}
