# Database Schema Documentation

## Database: `blog_api`

This document describes the complete database schema for the Blog API using MySQL.

---

## Tables Overview

| Table | Description | Rows (Sample Data) |
|-------|-------------|-------------------|
| `posts` | Stores blog posts | 3 |
| `comments` | Stores comments on posts | 5 |

---

## Table: `posts`

Stores all blog post data.

### Schema

```sql
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
```

### Columns

| Column | Type | Null | Default | Description |
|--------|------|------|---------|-------------|
| `id` | INT | NO | AUTO_INCREMENT | Primary key, unique identifier |
| `title` | VARCHAR(255) | NO | - | Post title (max 255 chars) |
| `content` | TEXT | NO | - | Post content (unlimited length) |
| `author` | VARCHAR(100) | NO | - | Author name (max 100 chars) |
| `created_at` | TIMESTAMP | NO | CURRENT_TIMESTAMP | Post creation timestamp |
| `updated_at` | TIMESTAMP | NO | CURRENT_TIMESTAMP | Last update timestamp (auto-updates) |

### Indexes

- **PRIMARY KEY**: `id`
- **INDEX**: `idx_created_at` on `created_at` (for sorting)
- **INDEX**: `idx_author` on `author` (for filtering by author)

### Constraints

- `title` cannot be NULL or empty
- `content` cannot be NULL
- `author` cannot be NULL or empty
- `updated_at` automatically updates on row modification

### Sample Data

```sql
INSERT INTO posts (title, content, author) VALUES
    ('Welcome to MySQL Blog API', 
     'This is the first post using MySQL database. The API now supports full CRUD operations with relational data.', 
     'Admin'),
    
    ('Getting Started with Node.js and MySQL', 
     'Learn how to build a RESTful API using Node.js, Express, and MySQL. This combination is powerful for building scalable applications.', 
     'John Doe'),
    
    ('Understanding Database Relationships', 
     'Foreign keys and relationships are essential in relational databases. This post explores how comments are linked to posts.', 
     'Jane Smith');
```

---

## Table: `comments`

Stores comments associated with blog posts.

### Schema

```sql
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
```

### Columns

| Column | Type | Null | Default | Description |
|--------|------|------|---------|-------------|
| `id` | INT | NO | AUTO_INCREMENT | Primary key, unique identifier |
| `post_id` | INT | NO | - | Foreign key to posts.id |
| `author` | VARCHAR(100) | NO | - | Comment author name |
| `content` | TEXT | NO | - | Comment content |
| `created_at` | TIMESTAMP | NO | CURRENT_TIMESTAMP | Comment creation timestamp |

### Indexes

- **PRIMARY KEY**: `id`
- **INDEX**: `idx_post_id` on `post_id` (for joins and filtering)
- **INDEX**: `idx_created_at` on `created_at` (for sorting)

### Constraints

- `post_id` cannot be NULL
- **FOREIGN KEY**: `post_id` references `posts(id)`
  - **ON DELETE CASCADE**: When a post is deleted, all its comments are automatically deleted
- `author` cannot be NULL or empty
- `content` cannot be NULL

### Sample Data

```sql
INSERT INTO comments (post_id, author, content) VALUES
    (1, 'Alice', 'Great post! MySQL is much better for relational data.'),
    (1, 'Bob', 'Thanks for sharing. Looking forward to more posts!'),
    (2, 'Charlie', 'Very informative tutorial. Helped me a lot!'),
    (2, 'Diana', 'Can you add more examples?'),
    (3, 'Eve', 'Excellent explanation of foreign keys!');
```

---

## Relationships

### One-to-Many: Posts → Comments

```
posts (1) ----< (∞) comments
```

- One post can have many comments
- Each comment belongs to exactly one post
- Relationship enforced by foreign key: `comments.post_id → posts.id`
- Cascade delete: Deleting a post removes all its comments

### Entity Relationship Diagram

```
┌─────────────────────┐
│       posts         │
├─────────────────────┤
│ id (PK)             │
│ title               │
│ content             │
│ author              │
│ created_at          │
│ updated_at          │
└─────────────────────┘
          │
          │ 1
          │
          │
          │ ∞
          ▼
┌─────────────────────┐
│     comments        │
├─────────────────────┤
│ id (PK)             │
│ post_id (FK) ───────┼─────┐
│ author              │     │
│ content             │     │
│ created_at          │     │
└─────────────────────┘     │
                             │
                             └─→ posts.id
```

---

## Database Configuration

### Character Set

- **Charset**: `utf8mb4` (supports all Unicode characters including emojis)
- **Collation**: `utf8mb4_unicode_ci` (case-insensitive Unicode)

### Storage Engine

- **Engine**: `InnoDB`
  - Supports foreign keys
  - ACID compliant
  - Row-level locking
  - Crash recovery

---

## Common Queries

### Get All Posts with Comment Count

```sql
SELECT 
    p.*,
    COUNT(c.id) as comment_count
FROM posts p
LEFT JOIN comments c ON p.id = c.post_id
GROUP BY p.id
ORDER BY p.created_at DESC;
```

### Get Post with All Comments

```sql
SELECT 
    p.id as post_id,
    p.title,
    p.content,
    p.author as post_author,
    p.created_at as post_date,
    c.id as comment_id,
    c.author as comment_author,
    c.content as comment_text,
    c.created_at as comment_date
FROM posts p
LEFT JOIN comments c ON p.id = c.post_id
WHERE p.id = ?
ORDER BY c.created_at DESC;
```

### Delete Post and All Comments (Automatic)

```sql
-- This will automatically delete all related comments
DELETE FROM posts WHERE id = ?;
```

---

## Performance Considerations

### Indexes

All frequently queried columns have indexes:
- `posts.created_at` - For sorting posts by date
- `posts.author` - For filtering posts by author
- `comments.post_id` - For joining with posts
- `comments.created_at` - For sorting comments by date

### Query Optimization

1. **Use prepared statements** - Prevents SQL injection and improves performance
2. **Limit results** - Use LIMIT for pagination
3. **Select specific columns** - Avoid `SELECT *` in production
4. **Connection pooling** - Reuse database connections (already configured)

---

## Backup and Restore

### Backup

```bash
# Full backup with data
mysqldump -u root -p blog_api > backup.sql

# Compressed backup
mysqldump -u root -p blog_api | gzip > backup.sql.gz

# Schema only
mysqldump -u root -p --no-data blog_api > schema.sql

# Data only
mysqldump -u root -p --no-create-info blog_api > data.sql
```

### Restore

```bash
# Restore from backup
mysql -u root -p blog_api < backup.sql

# Restore from compressed backup
gunzip < backup.sql.gz | mysql -u root -p blog_api
```

---

## Migration Notes

### From MongoDB to MySQL

Key differences when migrating from MongoDB:

| MongoDB | MySQL |
|---------|-------|
| ObjectId (12-byte hex) | INT AUTO_INCREMENT |
| No schema | Strict schema |
| Embedded documents | Foreign keys |
| No joins | JOIN queries |
| `_id` | `id` |
| Flexible fields | Fixed columns |

### Data Type Mapping

| MongoDB | MySQL |
|---------|-------|
| String | VARCHAR/TEXT |
| Number | INT/DECIMAL |
| Date | TIMESTAMP/DATETIME |
| Boolean | TINYINT(1) |
| ObjectId | INT |
| Array | Separate table with FK |
| Object | JSON or separate table |

---

## Security Best Practices

1. **Never use root in production** - Create dedicated database user
2. **Use strong passwords** - Minimum 12 characters
3. **Limit privileges** - Grant only necessary permissions
4. **Enable SSL/TLS** - Encrypt database connections
5. **Regular backups** - Automated daily backups
6. **Input validation** - Prevent SQL injection (use prepared statements)
7. **Keep MySQL updated** - Apply security patches

---

## Environment Variables

Required in `.env` file:

```env
DB_HOST=localhost        # Database host
DB_USER=root            # Database user
DB_PASSWORD=password    # Database password
DB_NAME=blog_api        # Database name
```

---

## Troubleshooting

### Common Issues

1. **Error 1049: Unknown database**
   - Run: `CREATE DATABASE blog_api;`

2. **Error 1045: Access denied**
   - Check credentials in `.env`

3. **Error 2002: Connection refused**
   - Ensure MySQL is running

4. **Foreign key constraint fails**
   - Ensure referenced post exists before adding comment

5. **Table doesn't exist**
   - Import schema: `mysql -u root -p blog_api < database.sql`

---

## Version History

- **v1.0** - Initial MySQL schema
  - Posts table with auto-increment ID
  - Comments table with foreign key
  - Sample data included
  - Indexes for performance

