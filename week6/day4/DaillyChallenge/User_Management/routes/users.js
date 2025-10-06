import express from 'express'
import fs from 'fs/promises'
import path from 'path'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const router = express.Router()
const DATA_PATH = path.join(__dirname, '..', 'data', 'users.json')
const SALT_ROUNDS = 10

async function readUsers() {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf8')
    return JSON.parse(data || '[]')
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.writeFile(DATA_PATH, '[]', 'utf8')
      return []
    }
    throw err
  }
}

async function writeUsers(users) {
  await fs.writeFile(DATA_PATH, JSON.stringify(users, null, 2), 'utf8')
}

router.post('/register', async (req, res) => {
  try {
    const { name, lastName, email, username, password } = req.body
    if (!name || !lastName || !email || !username || !password)
      return res.status(400).json({ error: 'All fields are required.' })
    if (password.length < 6)
      return res.status(400).json({ error: 'Password must be at least 6 characters.' })
    const users = await readUsers()
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase()))
      return res.status(409).json({ error: 'Username already exists.' })
    for (const u of users) {
      const same = await bcrypt.compare(password, u.passwordHash)
      if (same)
        return res.status(409).json({ error: 'Password already in use by another user.' })
    }
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    const passwordHash = await bcrypt.hash(password, salt)
    const newUser = { id: uuidv4(), name, lastName, email, username, passwordHash, createdAt: new Date().toISOString() }
    users.push(newUser)
    await writeUsers(users)
    const { passwordHash: ph, ...userSafe } = newUser
    res.status(201).json({ message: 'User registered successfully.', user: userSafe })
  } catch {
    res.status(500).json({ error: 'Failed to register user.' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password)
      return res.status(400).json({ error: 'Username and password are required.' })
    const users = await readUsers()
    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase())
    if (!user)
      return res.status(401).json({ error: 'Invalid credentials. User not registered.' })
    const match = await bcrypt.compare(password, user.passwordHash)
    if (!match)
      return res.status(401).json({ error: 'Invalid credentials. Wrong password.' })
    const { passwordHash, ...safe } = user
    res.json({ message: `Welcome back, ${user.name}!`, user: safe })
  } catch {
    res.status(500).json({ error: 'Failed to login.' })
  }
})

router.get('/', async (req, res) => {
  try {
    const users = await readUsers()
    const safeUsers = users.map(({ passwordHash, ...rest }) => rest)
    res.json(safeUsers)
  } catch {
    res.status(500).json({ error: 'Failed to read users.' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const users = await readUsers()
    const user = users.find(u => u.id === req.params.id)
    if (!user) return res.status(404).json({ error: 'User not found.' })
    const { passwordHash, ...safe } = user
    res.json(safe)
  } catch {
    res.status(500).json({ error: 'Failed to read user.' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const { name, lastName, email, username, password } = req.body
    const users = await readUsers()
    const idx = users.findIndex(u => u.id === id)
    if (idx === -1) return res.status(404).json({ error: 'User not found.' })
    if (username && users.some(u => u.username.toLowerCase() === username.toLowerCase() && u.id !== id))
      return res.status(409).json({ error: 'Username already used by another user.' })
    let newPasswordHash
    if (password) {
      if (password.length < 6)
        return res.status(400).json({ error: 'Password must be at least 6 characters.' })
      for (const u of users) {
        if (u.id === id) continue
        const same = await bcrypt.compare(password, u.passwordHash)
        if (same)
          return res.status(409).json({ error: 'Password already in use by another user.' })
      }
      const salt = await bcrypt.genSalt(SALT_ROUNDS)
      newPasswordHash = await bcrypt.hash(password, salt)
    }
    const user = users[idx]
    if (name) user.name = name
    if (lastName) user.lastName = lastName
    if (email) user.email = email
    if (username) user.username = username
    if (newPasswordHash) user.passwordHash = newPasswordHash
    user.updatedAt = new Date().toISOString()
    users[idx] = user
    await writeUsers(users)
    const { passwordHash, ...safe } = user
    res.json({ message: 'User updated successfully.', user: safe })
  } catch {
    res.status(500).json({ error: 'Failed to update user.' })
  }
})

export default router