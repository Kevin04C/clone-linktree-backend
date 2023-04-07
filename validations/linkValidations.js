import { body, param } from 'express-validator'
import { fieldValidations } from '../utils/fieldValidations.js'

export const validationAddNewLink = [
  body('title').not().isEmpty(),
  body('url').not().isEmpty().isURL(),
  fieldValidations
]

export const validationUpdateLink = [
  param('idLink').not().isEmpty(),
  body('title').not().isEmpty(),
  body('url').not().isEmpty().isURL(),
  body('active').not().isEmpty().isBoolean(),
  fieldValidations
]
