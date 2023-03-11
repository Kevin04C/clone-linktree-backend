import { pool } from '../config/database.js'
import { handleErrorModels } from '../utils/handleErrors.js'

export class User {
  constructor(username, email, password) {
    this.username = username
    this.email = email
    this.password = password
  }

  static async findByEmail(email) {
    const sql = `SELECT users.id, username, email, password, photo_users.id_photo_user, 
      photo_users.photo_url, security_users.verify, 
      security_users.forgot_password, security_users.token,
      profile.bio, profile.profile_title
      FROM users
      INNER JOIN photo_users ON users.id = photo_users.users_id
      INNER JOIN security_users on users.id  = security_users.users_id
      INNER JOIN profile ON users.id = profile.users_id
      WHERE email = ?
    `
    try {
      const data = [email]
      const [rows] = await pool.query(sql, data)
      return rows.at(0) ?? null
    } catch (error) {
      handleErrorModels('Error find user with email')
    }
  }

  static async findUsername(username) {
    const sql = `SELECT users.id, username, email, password, photo_users.id_photo_user, 
    photo_users.photo_url, security_users.verify, 
    security_users.forgot_password, security_users.token,
    profile.bio, profile.profile_title
    FROM users
    INNER JOIN photo_users ON users.id = photo_users.users_id
    INNER JOIN security_users on users.id  = security_users.users_id
    INNER JOIN profile ON users.id = profile.users_id
    WHERE username = ?
  `
    try {
      const [rows] = await pool.query(sql, username)
      return rows.at(0) ?? null
    } catch (error) {
      handleErrorModels('Error find user')
    }
  }

  static async find({ column, value }) {
    const sql = `
      SELECT users.id, users.username, users.email, users.password, photo_users.id_photo_user, 
      photo_users.photo_url, security_users.verify, security_users.forgot_password, security_users.token
      FROM users
      INNER JOIN photo_users ON users.id = photo_users.users_id
      INNER JOIN security_users on users.id  = security_users.id
      WHERE ? = ?
    `
    try {
      const data = [column, value]
      const [rows] = await pool.query(sql, data)
      return rows.at(0) ?? null
    } catch (error) {
      handleErrorModels('Error find user')
    }
  }

  async save() {
    const sql = 'INSERT INTO users (username, email, password) VALUES (?,?,?)'
    try {
      const data = [this.username, this.email, this.password]
      const [rows] = await pool.query(sql, data)
      return rows
    } catch (error) {
      handleErrorModels('Error saved user')
    }
  }
}
