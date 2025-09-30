import PostModel from '../models/postModel.js';

export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.getAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await PostModel.getById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = await PostModel.create(title, content);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedPost = await PostModel.update(req.params.id, title, content);
    if (!updatedPost) return res.status(404).json({ error: 'Post not found' });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deletePost = async (req, res) => {
  try {
    const deletedPost = await PostModel.delete(req.params.id);
    if (!deletedPost) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
