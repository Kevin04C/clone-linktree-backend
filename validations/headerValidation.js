import { body, param } from 'express-validator'
import { fieldValidations } from '../utils/fieldValidations.js'

export const validationsDeleteHeader = [
  param('id').not().isEmpty(),
  fieldValidations
]

export const validationsUpdatedHeader = [
  param('id').not().isEmpty(),
  body('headline').isString(),
  body('active')
    .not()
    .isEmpty()
    .isNumeric()
    .custom((value) => {
      if (![0, 1].includes(value)) {
        throw new Error('the active field only accepts 1 or 0')
      }
      return true
    }),
  (req, res, next) => {
    fieldValidations(req, res, next)
  }
]
