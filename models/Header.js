import { pool } from '../config/database.js'
import { handleErrorModels } from '../utils/handleErrors.js'

export class Header {
  static async find(id) {
    const sql = 'SELECT * FROM headers WHERE id = ?'
    try {
      const [rows] = await pool.query(sql, id)
      return rows.at(0) ?? null
    } catch (error) {
      handleErrorModels('Error find header')
    }
  }

  static async createHeader({ headline, idUser }) {
    const sql = 'INSERT INTO headers (users_id) VALUES (?)'
    try {
      const data = [idUser]
      const [rows] = await pool.query(sql, data)
      return rows.affectedRows === 1
        ? { id: rows.insertId, headline, active: 0 }
        : null
    } catch (error) {
      handleErrorModels('Error create header')
    }
  }

  static async getHeaders(idUser) {
    const sql = 'SELECT * FROM headers WHERE users_id = ?'
    try {
      const data = [idUser]
      const [rows] = await pool.query(sql, data)
      return rows
    } catch (error) {
      handleErrorModels('Error get headers')
    }
  }

  static async updateHeader({ id, headline, active }) {
    const sql = 'UPDATE headers SET headline = ?, active = ? WHERE id = ?'
    const data = [headline, active, id]
    try {
      const [rows] = await pool.query(sql, data)
      return rows.affectedRows === 1
    } catch (error) {
      handleErrorModels('Error get headers')
    }
  }

  static async deleteHeader({ idHeader, idUser }) {
    const sql = 'DELETE FROM headers WHERE id = ? AND users_id = ?'
    const data = [idHeader, idUser]
    try {
      const [rows] = await pool.query(sql, data)
      return rows.affectedRows === 1
    } catch (error) {
      handleErrorModels('Error delete header')
    }
  }
}
