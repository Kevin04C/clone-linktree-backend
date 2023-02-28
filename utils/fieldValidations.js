import { request, response } from 'express'
import { validationResult } from 'express-validator'

export const fieldValidations = (req = request, res = response, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}
