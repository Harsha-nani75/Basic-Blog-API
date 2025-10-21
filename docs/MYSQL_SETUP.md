# MySQL Database Setup Guide

## Prerequisites
- MySQL Server installed on your system
- Node.js and npm installed

## Installation Steps

### 1. Install MySQL

#### Windows
1. Download MySQL Installer from https://dev.mysql.com/downloads/installer/
2. Run the installer and choose "Developer Default"
3. Set a root password during installation
4. Complete the installation process

#### macOS
```bash
# Using Homebrew
brew install mysql
brew services start mysql
mysql_secure_installation
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo mysql_secure_installation
```

### 2. Create Database and Import Schema

#### Option 1: Using MySQL Command Line
```bash
# Login to MySQL (you'll be prompted for password)
mysql -u root -p

# Then run these commands in MySQL:
CREATE DATABASE blog_api;
exit;

# Import the schema and sample data
mysql -u root -p blog_api < database.sql
```

#### Option 2: Using MySQL Workbench
1. Open MySQL Workbench
2. Connect to your MySQL server
3. Create a new database named `blog_api`
4. Open the `database.sql` file
5. Execute the SQL script

### 3. Configure Environment Variables

1. Copy the `.env.example` file to `.env`:
```bash
cp env.example .env
```

2. Update the `.env` file with your MySQL credentials:
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_actual_password
DB_NAME=blog_api
NODE_ENV=development
```

### 4. Install Dependencies

```bash
# Remove old MongoDB dependencies
npm uninstall mongoose

# Install new MySQL dependencies
npm install mysql2

# Or install all dependencies
npm install
```

### 5. Start the Server

```bash
# For development with auto-reload
npm run dev

# For production
npm start
```

## Database Schema

### Tables

#### Posts Table
```sql
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Comments Table
```sql
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    author VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);
```

## Verify Installation

### Test Database Connection
The server will automatically test the connection on startup. You should see:
```
✅ Connected to MySQL Database
Server running on port 3000
```

### Test API Endpoints

```bash
# Get all posts
curl http://localhost:3000/api/posts

# Create a new post
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Post","content":"Test content","author":"John Doe"}'

# Get post by ID
curl http://localhost:3000/api/posts/1

# Get comments for a post
curl http://localhost:3000/api/comments/posts/1
```

## Troubleshooting

### Connection Refused Error
- Make sure MySQL server is running: `sudo systemctl status mysql` (Linux) or check Services (Windows)
- Verify the port (default is 3306)
- Check firewall settings

### Authentication Error
- Verify username and password in `.env` file
- Try resetting MySQL root password
- Check if user has proper permissions

### Database Not Found Error
- Make sure you created the `blog_api` database
- Run the `database.sql` script to create tables
- Verify DB_NAME in `.env` file

### Table Doesn't Exist Error
- Import the schema: `mysql -u root -p blog_api < database.sql`
- Or manually run the SQL commands from `database.sql`

## Sample Data

The `database.sql` file includes sample posts and comments for testing. You can modify or delete them as needed.

## Useful MySQL Commands

```sql
-- Show all databases
SHOW DATABASES;

-- Use the blog database
USE blog_api;

-- Show all tables
SHOW TABLES;

-- View posts
SELECT * FROM posts;

-- View comments
SELECT * FROM comments;

-- View comments with post information
SELECT c.*, p.title as post_title 
FROM comments c 
JOIN posts p ON c.post_id = p.id;

-- Delete all data (keep tables)
TRUNCATE TABLE comments;
TRUNCATE TABLE posts;

-- Drop database (delete everything)
DROP DATABASE blog_api;
```

## Production Considerations

1. **Security**
   - Never commit `.env` file to version control
   - Use strong passwords for database users
   - Create a dedicated database user (not root) for the application
   - Enable SSL/TLS for database connections

2. **Performance**
   - Add indexes on frequently queried columns
   - Use connection pooling (already configured)
   - Consider caching frequently accessed data

3. **Backup**
   - Regular database backups
   - Export schema and data: `mysqldump -u root -p blog_api > backup.sql`
   - Restore from backup: `mysql -u root -p blog_api < backup.sql`

## Migration from MongoDB

If you're migrating from the previous MongoDB version:

1. Export data from MongoDB
2. Transform ObjectId to INT auto-increment IDs
3. Import data into MySQL using the schema provided
4. Update application code (already done in this version)
5. Test all API endpoints thoroughly

