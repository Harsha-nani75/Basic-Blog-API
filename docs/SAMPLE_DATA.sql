-- Additional Sample Data for Testing
-- Run this after the main database.sql if you want more test data

USE blog_api;

-- More sample posts
INSERT INTO posts (title, content, author) VALUES
    ('Building REST APIs with Express.js', 
     'Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It simplifies the process of building APIs and handling HTTP requests.', 
     'Sarah Johnson'),
    
    ('MySQL vs PostgreSQL: Which to Choose?', 
     'Both MySQL and PostgreSQL are excellent relational databases. MySQL is known for its speed and ease of use, while PostgreSQL offers more advanced features. The choice depends on your specific requirements.', 
     'Michael Chen'),
    
    ('Understanding Foreign Keys', 
     'Foreign keys are essential for maintaining referential integrity in relational databases. They ensure that relationships between tables remain consistent and prevent orphaned records.', 
     'Emily Davis'),
    
    ('Best Practices for API Design', 
     'RESTful API design follows certain conventions: use proper HTTP methods, meaningful URLs, appropriate status codes, and versioning. These practices make your API intuitive and easy to use.', 
     'David Martinez'),
    
    ('Introduction to Connection Pooling', 
     'Connection pooling is a technique used to maintain a cache of database connections that can be reused. This improves performance by reducing the overhead of creating new connections for each request.', 
     'Lisa Anderson');

-- More sample comments
INSERT INTO comments (post_id, author, content) VALUES
    (4, 'Tom Wilson', 'Great introduction to Express! Very helpful.'),
    (4, 'Anna Brown', 'Can you cover middleware in more detail?'),
    (5, 'Chris Lee', 'I prefer PostgreSQL for complex queries.'),
    (5, 'Maria Garcia', 'MySQL is perfect for my use case though.'),
    (6, 'James Taylor', 'This cleared up my confusion about foreign keys!'),
    (6, 'Jennifer White', 'Can you show CASCADE examples?'),
    (7, 'Robert King', 'Very useful API design tips!'),
    (7, 'Patricia Moore', 'What about GraphQL?'),
    (8, 'Daniel Harris', 'Connection pooling made my app much faster!'),
    (8, 'Laura Clark', 'What pool size do you recommend?');

-- Display results
SELECT 'Posts Created:' as Status;
SELECT COUNT(*) as total_posts FROM posts;

SELECT 'Comments Created:' as Status;
SELECT COUNT(*) as total_comments FROM comments;

SELECT 'Sample Posts:' as Status;
SELECT id, title, author, created_at FROM posts ORDER BY created_at DESC LIMIT 5;

SELECT 'Sample Comments:' as Status;
SELECT c.id, c.author, LEFT(c.content, 50) as preview, p.title as post_title 
FROM comments c 
JOIN posts p ON c.post_id = p.id 
ORDER BY c.created_at DESC LIMIT 5;

