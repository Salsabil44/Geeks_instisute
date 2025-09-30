import express from 'express';
import bookRoutes from './server/routes/bookRoutes.js';

const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);

// Invalid route handling
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
