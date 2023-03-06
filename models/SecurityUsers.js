import { pool } from '../config/database.js'

export class SecurityUsers {
  static async update({ id, verify, forgot_password: forgotPassword, token }) {
    const sql = `
    UPDATE security_users SET verify = ?, forgot_password = ?, token = ? WHERE users_id = ? 
    `
    try {
      const data = [verify, forgotPassword, token, id]
      const [rows] = await pool.query(sql, data)
      return rows.affectedRows
    } catch (error) {
      throw new Error('error update secutiry users')
    }
  }
}
