import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { connectionDb } from './config/database.js'
import userRoutes from './routes/user.js'
import linkRoutes from './routes/link.js'
import { verifyJwt } from './middlewares/verifyJwt.js'

dotenv.config()

connectionDb()

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000

app.use('/api/user', userRoutes)
app.use('/api/link', verifyJwt, linkRoutes)

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT} 🚀`)
})
