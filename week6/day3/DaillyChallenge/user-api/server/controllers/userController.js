import bcrypt from 'bcrypt';
import UserModel from '../models/userModel.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await UserModel.getById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { email, username, first_name, last_name, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ message: 'Email, username and password required' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await UserModel.createUser(
      { email, username, first_name, last_name },
      hashedPassword
    );

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Username and password required' });

    const hashedPassword = await UserModel.getPasswordByUsername(username);
    if (!hashedPassword) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, hashedPassword);
    if (!match) return res.status(401).json({ message: 'Invalid password' });

    res.json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedUser = await UserModel.updateUser(id, req.body);
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
