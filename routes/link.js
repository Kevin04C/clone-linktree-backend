import { Router } from 'express'
import {
  addNewLink,
  deleteLink,
  getLinks,
  updateLink
} from '../controllers/link.js'
import {
  validationAddNewLink,
  validationUpdateLink
} from '../validations/linkValidations.js'

const router = Router()

// route /api/link/

router.get('/', getLinks)
router.post('/add', validationAddNewLink, addNewLink)
router.put('/:idLink', validationUpdateLink, updateLink)
router.delete('/:idLink', deleteLink)

export default router
