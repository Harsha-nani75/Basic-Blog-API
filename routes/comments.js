const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');

// GET comments for a specific post
router.get('/posts/:postId', async (req, res) => {
  try {
    const comments = await Comment.findByPostId(req.params.postId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST add comment to a post
router.post('/posts/:postId', async (req, res) => {
  try {
    const { author, content } = req.body;
    
    if (!author || !content) {
      return res.status(400).json({ error: 'Author and content are required' });
    }

    // Check if post exists
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const savedComment = await Comment.create({
      postId: req.params.postId,
      author,
      content
    });
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE comment
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    await Comment.delete(req.params.id);
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
