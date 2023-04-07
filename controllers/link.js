import { request, response } from 'express'
import { Link } from '../models/Link.js'
import { formantLinks } from '../utils/formatLinks.js'
import { handleErrorResponse } from '../utils/handleErrors.js'

export const getLinks = async (req = request, res = response) => {
  const user = req.user
  try {
    const links = await Link.getLinks(user.id)
    const cleanLinks = formantLinks(links)
    res.json({
      ok: true,
      links: cleanLinks
    })
  } catch (error) {
    handleErrorResponse(res)
  }
}

export const addNewLink = async (req = request, res = response) => {
  const { title, url } = req.body
  const user = req.user
  try {
    const linkAdded = await Link.addLink({ title, url, userId: user.id })
    res.json({
      ok: true,
      link: linkAdded
    })
  } catch (error) {
    handleErrorResponse(res)
  }
}

export const updateLink = async (req = request, res = response) => {
  const user = req.user
  const idLink = req.params.idLink
  try {
    const link = await Link.findById(idLink)
    if (!link) {
      return res.status(404).json({
        ok: false,
        msg: 'link not found'
      })
    }

    if (!user.id === link.users_id) {
      return res.status(401).json({
        ok: false,
        msg: 'you do not have permissions'
      })
    }
    const linkUpdated = await Link.update(idLink, req.body)
    res.json({
      ok: true,
      link: linkUpdated
    })
  } catch (error) {
    handleErrorResponse(res)
  }
}

export const deleteLink = async (req = request, res = response) => {
  const user = req.user
  const idLink = req.params.idLink

  try {
    const link = await Link.findById(idLink)
    if (!link) {
      return res.status(404).json({
        ok: false,
        msg: 'link not found'
      })
    }
    if (user.id !== link.users_id) {
      return res.status(401).json({
        ok: false,
        msg: 'you do not have permissions'
      })
    }

    await Link.delete(user.id, link.id)
    res.json({
      ok: true,
      link
    })
  } catch (error) {
    handleErrorResponse(res)
  }
}
