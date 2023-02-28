import { request, response } from 'express'
import { body } from 'express-validator'
import { fieldValidations } from '../utils/fieldValidations.js'

export const validationRegisterUser = [
  body('username').not().isEmpty(),
  body('email').not().isEmpty().isEmail().normalizeEmail(),
  body('password').not().isEmpty().isLength({ min: 6 }),
  fieldValidations
]
