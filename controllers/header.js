import { request, response } from 'express'
import { handleErrorResponse } from '../utils/handleErrors.js'
import { Header } from '../models/Header.js'

export const getHeaders = async (req = request, res = response) => {
  const { id } = req.user
  try {
    const headers = await Header.getHeaders(id)
    res.json({
      ok: true,
      headers
    })
  } catch (error) {
    handleErrorResponse(res)
  }
}

export const createHeader = async (req = request, res = response) => {
  const { id } = req.user

  try {
    const header = await Header.createHeader({ idUser: id })
    res.json({
      ok: true,
      header
    })
  } catch (error) {
    console.log(error)
    handleErrorResponse(res)
  }
}

export const deleteHeader = async (req = request, res = response) => {
  const id = req.params.id
  const user = req.user

  try {
    const header = await Header.find(id)
    if (!header) {
      return res.status(404).json({
        ok: false,
        msg: 'header not found'
      })
    }
    if (!header.users_id === user.id) {
      return res.status(404).json({
        ok: false,
        msg: 'you do not hve permissions'
      })
    }
    await Header.deleteHeader({ idHeader: id, idUser: user.id })
    res.json({
      ok: true,
      header
    })
  } catch (error) {
    handleErrorResponse(res)
  }
}

export const updateHeader = async (req = request, res = response) => {
  const id = req.params.id
  const { headline, active } = req.body
  const user = req.user
  try {
    const header = await Header.find(id)

    if (!header) {
      return res.status(404).json({
        ok: false,
        msg: 'header not found'
      })
    }
    if (!header.users_id === user.id) {
      return res.status(404).json({
        ok: false,
        msg: 'you do not hve permissions'
      })
    }

    await Header.updateHeader({ id, headline, active })

    res.json({
      ok: true,
      header: {
        ...header,
        headline,
        active
      }
    })
  } catch (error) {
    handleErrorResponse(res)
  }
}
