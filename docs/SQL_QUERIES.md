# Useful SQL Queries for Blog API

This document contains helpful SQL queries for managing and querying your blog database.

## Basic Queries

### View All Posts
```sql
SELECT * FROM posts ORDER BY created_at DESC;
```

### View All Comments
```sql
SELECT * FROM comments ORDER BY created_at DESC;
```

### Count Posts and Comments
```sql
SELECT 
    (SELECT COUNT(*) FROM posts) as total_posts,
    (SELECT COUNT(*) FROM comments) as total_comments;
```

## Advanced Queries

### Posts with Comment Count
```sql
SELECT 
    p.*,
    COUNT(c.id) as comment_count
FROM posts p
LEFT JOIN comments c ON p.id = c.post_id
GROUP BY p.id
ORDER BY p.created_at DESC;
```

### Recent Posts with Their Comments
```sql
SELECT 
    p.id as post_id,
    p.title,
    p.author as post_author,
    p.created_at as post_date,
    c.id as comment_id,
    c.author as comment_author,
    c.content as comment_text,
    c.created_at as comment_date
FROM posts p
LEFT JOIN comments c ON p.id = c.post_id
ORDER BY p.created_at DESC, c.created_at ASC
LIMIT 20;
```

### Most Commented Posts
```sql
SELECT 
    p.id,
    p.title,
    p.author,
    COUNT(c.id) as comment_count
FROM posts p
LEFT JOIN comments c ON p.id = c.post_id
GROUP BY p.id
ORDER BY comment_count DESC, p.created_at DESC;
```

### Posts Without Comments
```sql
SELECT p.*
FROM posts p
LEFT JOIN comments c ON p.id = c.post_id
WHERE c.id IS NULL
ORDER BY p.created_at DESC;
```

### Recent Activity (Posts and Comments Combined)
```sql
SELECT 
    'post' as type,
    id,
    title as content,
    author,
    created_at
FROM posts

UNION ALL

SELECT 
    'comment' as type,
    c.id,
    CONCAT('Comment on: ', p.title) as content,
    c.author,
    c.created_at
FROM comments c
JOIN posts p ON c.post_id = p.id

ORDER BY created_at DESC
LIMIT 10;
```

### Search Posts by Title or Content
```sql
SELECT * FROM posts 
WHERE title LIKE '%keyword%' 
   OR content LIKE '%keyword%'
ORDER BY created_at DESC;
```

### Posts by Specific Author
```sql
SELECT * FROM posts 
WHERE author = 'Author Name'
ORDER BY created_at DESC;
```

### Comments by Specific Author
```sql
SELECT 
    c.*,
    p.title as post_title
FROM comments c
JOIN posts p ON c.post_id = p.id
WHERE c.author = 'Commenter Name'
ORDER BY c.created_at DESC;
```

## Maintenance Queries

### Delete Old Posts (older than 30 days)
```sql
DELETE FROM posts 
WHERE created_at < DATE_SUB(NOW(), INTERVAL 30 DAY);
```

### Delete Comments Without Content
```sql
DELETE FROM comments 
WHERE TRIM(content) = '' OR content IS NULL;
```

### Update Post Content
```sql
UPDATE posts 
SET content = 'New content here',
    updated_at = CURRENT_TIMESTAMP
WHERE id = 1;
```

### Bulk Update Author Name
```sql
UPDATE posts 
SET author = 'New Author Name'
WHERE author = 'Old Author Name';
```

## Analytics Queries

### Posts per Author
```sql
SELECT 
    author,
    COUNT(*) as post_count,
    MAX(created_at) as last_post_date
FROM posts
GROUP BY author
ORDER BY post_count DESC;
```

### Comments per Author
```sql
SELECT 
    author,
    COUNT(*) as comment_count,
    MAX(created_at) as last_comment_date
FROM comments
GROUP BY author
ORDER BY comment_count DESC;
```

### Daily Post Count (Last 7 Days)
```sql
SELECT 
    DATE(created_at) as date,
    COUNT(*) as posts_count
FROM posts
WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

### Average Comments per Post
```sql
SELECT 
    AVG(comment_count) as avg_comments_per_post
FROM (
    SELECT 
        p.id,
        COUNT(c.id) as comment_count
    FROM posts p
    LEFT JOIN comments c ON p.id = c.post_id
    GROUP BY p.id
) as post_stats;
```

## Database Maintenance

### Check Table Sizes
```sql
SELECT 
    table_name,
    ROUND(((data_length + index_length) / 1024 / 1024), 2) as size_mb
FROM information_schema.tables
WHERE table_schema = 'blog_api'
ORDER BY size_mb DESC;
```

### Optimize Tables
```sql
OPTIMIZE TABLE posts;
OPTIMIZE TABLE comments;
```

### Check Foreign Key Constraints
```sql
SELECT 
    TABLE_NAME,
    COLUMN_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = 'blog_api'
  AND REFERENCED_TABLE_NAME IS NOT NULL;
```

## Backup and Restore

### Backup Database
```bash
# Backup entire database
mysqldump -u root -p blog_api > backup_$(date +%Y%m%d).sql

# Backup with compression
mysqldump -u root -p blog_api | gzip > backup_$(date +%Y%m%d).sql.gz

# Backup only schema (no data)
mysqldump -u root -p --no-data blog_api > schema_only.sql

# Backup only data (no schema)
mysqldump -u root -p --no-create-info blog_api > data_only.sql
```

### Restore Database
```bash
# Restore from backup
mysql -u root -p blog_api < backup_20240101.sql

# Restore from compressed backup
gunzip < backup_20240101.sql.gz | mysql -u root -p blog_api
```

## Testing Queries

### Insert Test Post
```sql
INSERT INTO posts (title, content, author) 
VALUES ('Test Post', 'This is a test post content', 'Test Author');
```

### Insert Test Comment
```sql
INSERT INTO comments (post_id, author, content) 
VALUES (1, 'Test Commenter', 'This is a test comment');
```

### Clear All Data (Keep Tables)
```sql
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE comments;
TRUNCATE TABLE posts;
SET FOREIGN_KEY_CHECKS = 1;
```

### Reset Auto Increment
```sql
ALTER TABLE posts AUTO_INCREMENT = 1;
ALTER TABLE comments AUTO_INCREMENT = 1;
```

## Performance Optimization

### Add Indexes for Better Performance
```sql
-- Already created in database.sql, but here for reference:

-- Index on posts created_at for sorting
CREATE INDEX idx_posts_created_at ON posts(created_at);

-- Index on posts author for filtering
CREATE INDEX idx_posts_author ON posts(author);

-- Index on comments post_id for joins
CREATE INDEX idx_comments_post_id ON comments(post_id);

-- Index on comments created_at for sorting
CREATE INDEX idx_comments_created_at ON comments(created_at);
```

### Full-Text Search Index (Optional)
```sql
-- Add full-text index for better search performance
ALTER TABLE posts ADD FULLTEXT INDEX ft_posts_search (title, content);

-- Use full-text search
SELECT * FROM posts 
WHERE MATCH(title, content) AGAINST('search term' IN NATURAL LANGUAGE MODE);
```

### Analyze Query Performance
```sql
-- Show query execution plan
EXPLAIN SELECT * FROM posts WHERE author = 'John Doe';

-- Show index usage
SHOW INDEX FROM posts;
SHOW INDEX FROM comments;
```

