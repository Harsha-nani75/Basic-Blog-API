-- Blog API Database Schema
-- MySQL Database Setup

-- Create database
CREATE DATABASE IF NOT EXISTS blog_api;
USE blog_api;

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;

-- Posts table
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_created_at (created_at),
    INDEX idx_author (author)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Comments table
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    author VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    INDEX idx_post_id (post_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample data for testing
INSERT INTO posts (title, content, author) VALUES
    ('Welcome to MySQL Blog API', 'This is the first post using MySQL database. The API now supports full CRUD operations with relational data.', 'Admin'),
    ('Getting Started with Node.js and MySQL', 'Learn how to build a RESTful API using Node.js, Express, and MySQL. This combination is powerful for building scalable applications.', 'John Doe'),
    ('Understanding Database Relationships', 'Foreign keys and relationships are essential in relational databases. This post explores how comments are linked to posts.', 'Jane Smith');

INSERT INTO comments (post_id, author, content) VALUES
    (1, 'Alice', 'Great post! MySQL is much better for relational data.'),
    (1, 'Bob', 'Thanks for sharing. Looking forward to more posts!'),
    (2, 'Charlie', 'Very informative tutorial. Helped me a lot!'),
    (2, 'Diana', 'Can you add more examples?'),
    (3, 'Eve', 'Excellent explanation of foreign keys!');

