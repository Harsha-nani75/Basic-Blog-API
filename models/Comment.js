const { pool } = require('../config/database');

class Comment {
  // Get all comments for a post
  static async findByPostId(postId) {
    const [rows] = await pool.query(
      'SELECT * FROM comments WHERE post_id = ? ORDER BY created_at DESC',
      [postId]
    );
    return rows;
  }

  // Get comment by ID
  static async findById(id) {
    const [rows] = await pool.query(
      'SELECT * FROM comments WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  // Create new comment
  static async create(commentData) {
    const { postId, author, content } = commentData;
    const [result] = await pool.query(
      'INSERT INTO comments (post_id, author, content) VALUES (?, ?, ?)',
      [postId, author, content]
    );
    return this.findById(result.insertId);
  }

  // Delete comment
  static async delete(id) {
    const [result] = await pool.query(
      'DELETE FROM comments WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = Comment;
