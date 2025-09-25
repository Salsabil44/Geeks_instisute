import express from 'express';
import cors from 'cors';
import { fetchPosts } from './data/dataService.js';
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


// GET all posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await fetchPosts();
    res.json(posts); // send all posts from JSONPlaceholder
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
