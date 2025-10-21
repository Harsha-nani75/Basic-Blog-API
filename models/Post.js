const { pool } = require('../config/database');

class Post {
  // Get all posts
  static async findAll() {
    const [rows] = await pool.query(
      'SELECT * FROM posts ORDER BY created_at DESC'
    );
    return rows;
  }

  // Get post by ID
  static async findById(id) {
    const [rows] = await pool.query(
      'SELECT * FROM posts WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  // Create new post
  static async create(postData) {
    const { title, content, author } = postData;
    const [result] = await pool.query(
      'INSERT INTO posts (title, content, author) VALUES (?, ?, ?)',
      [title, content, author]
    );
    return this.findById(result.insertId);
  }

  // Update post
  static async update(id, postData) {
    const { title, content, author } = postData;
    const updates = [];
    const values = [];

    if (title !== undefined) {
      updates.push('title = ?');
      values.push(title);
    }
    if (content !== undefined) {
      updates.push('content = ?');
      values.push(content);
    }
    if (author !== undefined) {
      updates.push('author = ?');
      values.push(author);
    }

    if (updates.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    await pool.query(
      `UPDATE posts SET ${updates.join(', ')} WHERE id = ?`,
      values
    );
    return this.findById(id);
  }

  // Delete post
  static async delete(id) {
    const [result] = await pool.query(
      'DELETE FROM posts WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = Post;
