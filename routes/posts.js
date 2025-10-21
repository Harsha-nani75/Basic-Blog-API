const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new post
router.post('/', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    
    if (!title || !content || !author) {
      return res.status(400).json({ error: 'Title, content, and author are required' });
    }

    const savedPost = await Post.create({ title, content, author });
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update post
router.put('/:id', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const updatedPost = await Post.update(req.params.id, { title, content, author });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await Post.delete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
