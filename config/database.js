import * as dotenv from 'dotenv'
import { createPool } from 'mysql2/promise'

dotenv.config()

export const pool = createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  port: process.env.DATABASE_PORT,
  ssl: {
    rejectUnauthorized: true
  }
})

export const connectionDb = async () => {
  try {
    await pool.getConnection()
    console.log('connected db')
  } catch (error) {
    console.log('can not connected db')
    console.log(error)
  }
}
