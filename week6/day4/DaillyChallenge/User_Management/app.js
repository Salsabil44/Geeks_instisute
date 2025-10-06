import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import usersRouter from './routes/users.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'views')))
app.use('/api/users', usersRouter)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'register.html')))
app.use((err, req, res, next) => res.status(500).json({ error: 'Internal server error' }))

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
