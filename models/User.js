import { pool } from '../config/database'

export class User {
  constructor(username, email, password) {
    this.username = username
    this.email = email
    this.password = password
  }

  async save() {
    const sql = 'INSERT INTO users (username, email, password) VALUES (?,?,?)'
    try {
      const data = [this.username, this.email, this.password]
      const [rows] = await pool.execute(sql, data)
      return rows
    } catch (error) {
      throw new Error('Error saved user')
    }
  }
}
