import { pool } from '../config/database.js'
import { handleErrorModels } from '../utils/handleErrors.js'

export class Link {
  static async findById(id) {
    const sql = 'SELECT * FROM links WHERE id = ?'
    try {
      const [rows] = await pool.query(sql, id)
      return rows.at(0)
    } catch (error) {
      handleErrorModels('Error get links')
    }
  }

  static async getLinks(userId) {
    const sql = 'SELECT * FROM links WHERE links.users_id = ?'
    try {
      const [rows] = await pool.query(sql, userId)
      return rows
    } catch (error) {
      handleErrorModels('Error get links')
    }
  }

  static async addLink({ title, url, userId }) {
    const sql = 'INSERT INTO links (title, url, users_id) VALUES (?, ?, ?)'
    try {
      const data = [title, url, userId]
      const [rows] = await pool.query(sql, data)
      return rows.affectedRows === 1
        ? { title, url, id: rows.insertId, active: 0 }
        : null
    } catch (error) {
      handleErrorModels('Error add link')
    }
  }

  static async update(id, { title, url, active }) {
    const sql = 'UPDATE links SET title = ?, url = ?, active = ? WHERE id = ?'
    try {
      const data = [title, url, active, id]
      const [rows] = await pool.query(sql, data)
      return rows.affectedRows === 1 ? { id, title, url, active } : null
    } catch (error) {
      handleErrorModels('Error update link')
    }
  }

  static async delete(idUser, idLink) {
    const sql = 'DELETE FROM links WHERE id = ? AND users_id = ?'
    try {
      const data = [idLink, idUser]
      const [rows] = await pool.query(sql, data)
      return rows.affectedRows === 1
    } catch (error) {
      handleErrorModels('Error update link')
    }
  }
}
