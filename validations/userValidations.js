import { body, query } from 'express-validator'
import { fieldValidations } from '../utils/fieldValidations.js'

export const validationRegister = [
  body('username').not().isEmpty(),
  body('email').not().isEmpty().isEmail().normalizeEmail(),
  body('password').not().isEmpty().isLength({ min: 6 }),
  fieldValidations
]

export const validationLogin = [
  body('username').not().isEmpty(),
  body('password').not().isEmpty().isLength({ min: 6 }),
  fieldValidations
]

export const validationAutWithGoogle = [
  body('credential').not().isEmpty(),
  fieldValidations
]

export const validationVerifyAccount = [
  query('token').not().isEmpty(),
  fieldValidations
]

export const validationVerifyUsername = [
  body('username').not().isEmpty(),
  fieldValidations
]
export const validationVerifyEmail = [
  body('email').not().isEmpty().isEmail().normalizeEmail(),
  fieldValidations
]
