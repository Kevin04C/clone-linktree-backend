import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { connectionDb } from './config/database.js'

dotenv.config()

connectionDb()

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000

app.get('/', async (req, res) => {
  res.json({
    ok: true
  })
})

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT} 🚀`)
})
