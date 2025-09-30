import express from 'express';
import userRoutes from './server/routes/userRoutes.js';

const app = express();
const PORT = 5000;

app.use(express.json());

// Routes
app.use('/users', userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
