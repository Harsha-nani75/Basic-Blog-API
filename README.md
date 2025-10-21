# 📝 Basic Blog API

A simple, clean RESTful blog API built with Node.js, Express, and MySQL. Features full CRUD operations for blog posts and comments with a responsive web interface.

![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)
![Express](https://img.shields.io/badge/Express-v4.18-blue.svg)
![MySQL](https://img.shields.io/badge/MySQL-v8+-orange.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Features

- ✅ **Full CRUD Operations** - Create, read, update, and delete blog posts
- ✅ **Comments System** - Add and delete comments on posts
- ✅ **RESTful API** - Clean, intuitive API endpoints
- ✅ **Responsive UI** - Modern, mobile-friendly interface
- ✅ **MySQL Database** - Relational data with foreign key constraints
- ✅ **Data Integrity** - Automatic timestamps and cascade deletes
- ✅ **Connection Pooling** - Optimized database connections
- ✅ **Easy Setup** - Simple installation and configuration

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Basic-Blog-API.git
   cd Basic-Blog-API
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MySQL database**
   ```bash
   mysql -u root -p
   CREATE DATABASE blog_api;
   exit;
   
   mysql -u root -p blog_api < database.sql
   ```

4. **Configure environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your MySQL credentials:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=blog_api
   ```

5. **Start the server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
Basic-Blog-API/
├── config/
│   └── database.js          # MySQL connection pool
├── models/
│   ├── Post.js              # Post model
│   └── Comment.js           # Comment model
├── routes/
│   ├── posts.js             # Posts API routes
│   └── comments.js          # Comments API routes
├── frontend/
│   ├── css/
│   │   └── style.css        # Styles
│   ├── js/
│   │   └── app.js           # Frontend JavaScript
│   └── index.html           # Main HTML file
├── docs/                    # Documentation
├── database.sql             # Database schema + sample data
├── server.js                # Main server file
├── package.json             # Dependencies
├── .env.example             # Environment template
└── README.md                # You are here!
```

## 🔌 API Endpoints

### Posts

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/posts` | Get all posts |
| `GET` | `/api/posts/:id` | Get single post by ID |
| `POST` | `/api/posts` | Create new post |
| `PUT` | `/api/posts/:id` | Update post |
| `DELETE` | `/api/posts/:id` | Delete post |

### Comments

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/comments/posts/:postId` | Get all comments for a post |
| `POST` | `/api/comments/posts/:postId` | Add comment to post |
| `DELETE` | `/api/comments/:id` | Delete comment |

### Example Request

**Create a new post:**
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "content": "This is the content of my post",
    "author": "John Doe"
  }'
```

**Response:**
```json
{
  "id": 1,
  "title": "My First Post",
  "content": "This is the content of my post",
  "author": "John Doe",
  "created_at": "2024-10-21T10:00:00.000Z",
  "updated_at": "2024-10-21T10:00:00.000Z"
}
```

## 🗄️ Database Schema

### Posts Table
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

### Comments Table
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

**Relationship:** One post can have many comments. Deleting a post automatically deletes all its comments (CASCADE).

## 📚 Documentation

- [**Quick Setup Guide**](docs/QUICK_SETUP.md) - Get started quickly
- [**MySQL Setup Guide**](docs/MYSQL_SETUP.md) - Detailed MySQL installation
- [**API Testing Guide**](docs/API_TESTING.md) - Complete API testing examples
- [**Database Schema**](docs/DATABASE_SCHEMA.md) - Full database documentation
- [**SQL Queries**](docs/SQL_QUERIES.md) - Useful SQL query examples

## 🛠️ Built With

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Express.js](https://expressjs.com/) - Web framework
- [MySQL](https://www.mysql.com/) - Relational database
- [mysql2](https://www.npmjs.com/package/mysql2) - MySQL client for Node.js

## 🧪 Testing

Test the API using:
- **Browser** - Visit `http://localhost:3000`
- **curl** - Command line requests
- **Postman** - GUI API testing tool
- **Thunder Client** - VS Code extension

See [API Testing Guide](docs/API_TESTING.md) for detailed examples.

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built as part of 100 Days of Node.js challenge
- Inspired by RESTful API best practices
- Thanks to the Node.js and Express.js communities

## 📧 Contact

- **GitHub:** [@yourusername](https://github.com/yourusername)
- **Project Link:** [https://github.com/yourusername/Basic-Blog-API](https://github.com/yourusername/Basic-Blog-API)

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

Made with ❤️ and Node.js
