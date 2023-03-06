import { response } from 'express'

export const handleErrorResponse = (
  res = response,
  msg = 'Internal server error',
  code = 500
) => {
  res.status(code)
  res.json({
    ok: false,
    message: msg
  })
}

export const handleErrorModels = (msg) => {
  throw new Error(msg)
}
