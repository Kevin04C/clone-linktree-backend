import { Router } from 'express'
import {
  createHeader,
  deleteHeader,
  getHeaders,
  updateHeader
} from '../controllers/header.js'
import {
  validationsDeleteHeader,
  validationsUpdatedHeader
} from '../validations/headerValidation.js'

const router = Router()

router.get('/', getHeaders)
router.post('/create', createHeader)
router.delete('/:id', validationsDeleteHeader, deleteHeader)
router.put('/:id', validationsUpdatedHeader, updateHeader)

export default router
