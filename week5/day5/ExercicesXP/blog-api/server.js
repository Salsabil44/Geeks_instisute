const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

const posts =[
    { title: 'Post 1', content: 'This is the content of post 1' },
    { title: 'Post 2', content: 'This is the content of post 2' },
    { title: 'Post 3', content: 'This is the content of post 3' }
];
app.get('/posts', (req, res) => {
    res.json(posts);
});
app.get('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    if (postId >= 0 && postId < posts.length) {
        res.json(posts[postId]);
    } else {
        res.status(404).json({ error: 'Post not found' });
    }           
});
app.post('/posts', (req, res) => {
    const newPost = req.body;
    posts.push(newPost);
    res.status(201).json(newPost);
});

app.put('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const updatedPost = req.body;
    if (postId >= 0 && postId < posts.length) {
        posts[postId] = updatedPost;
        res.json(updatedPost);
    }
    else {
        res.status(404).json({ error: 'Post not found' });
    }
});
app.delete('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    if (postId >= 0 && postId < posts.length) {
        const deletedPost = posts.splice(postId, 1);
        res.json(deletedPost);
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
});