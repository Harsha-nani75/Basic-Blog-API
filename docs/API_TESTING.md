# API Testing Guide

Complete guide for testing the Blog API endpoints.

## Prerequisites

- Server running on `http://localhost:3000`
- MySQL database set up with sample data
- Tool for testing (curl, Postman, or browser)

## 1. Posts API

### Get All Posts
```bash
curl http://localhost:3000/api/posts
```

**Expected Response:**
```json
[
  {
    "id": 1,
    "title": "Welcome to MySQL Blog API",
    "content": "This is the first post...",
    "author": "Admin",
    "created_at": "2024-01-01T10:00:00.000Z",
    "updated_at": "2024-01-01T10:00:00.000Z"
  },
  ...
]
```

### Get Single Post
```bash
curl http://localhost:3000/api/posts/1
```

**Expected Response:**
```json
{
  "id": 1,
  "title": "Welcome to MySQL Blog API",
  "content": "This is the first post...",
  "author": "Admin",
  "created_at": "2024-01-01T10:00:00.000Z",
  "updated_at": "2024-01-01T10:00:00.000Z"
}
```

### Create New Post
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My New Post",
    "content": "This is the content of my new post",
    "author": "John Doe"
  }'
```

**Expected Response:**
```json
{
  "id": 6,
  "title": "My New Post",
  "content": "This is the content of my new post",
  "author": "John Doe",
  "created_at": "2024-01-15T14:30:00.000Z",
  "updated_at": "2024-01-15T14:30:00.000Z"
}
```

### Update Post
```bash
curl -X PUT http://localhost:3000/api/posts/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "content": "Updated content here"
  }'
```

**Expected Response:**
```json
{
  "id": 1,
  "title": "Updated Title",
  "content": "Updated content here",
  "author": "Admin",
  "created_at": "2024-01-01T10:00:00.000Z",
  "updated_at": "2024-01-15T14:35:00.000Z"
}
```

### Delete Post
```bash
curl -X DELETE http://localhost:3000/api/posts/1
```

**Expected Response:**
```json
{
  "message": "Post deleted successfully"
}
```

## 2. Comments API

### Get Comments for a Post
```bash
curl http://localhost:3000/api/comments/posts/1
```

**Expected Response:**
```json
[
  {
    "id": 1,
    "post_id": 1,
    "author": "Alice",
    "content": "Great post!",
    "created_at": "2024-01-01T11:00:00.000Z"
  },
  ...
]
```

### Add Comment to Post
```bash
curl -X POST http://localhost:3000/api/comments/posts/1 \
  -H "Content-Type: application/json" \
  -d '{
    "author": "Jane Smith",
    "content": "This is my comment on the post"
  }'
```

**Expected Response:**
```json
{
  "id": 6,
  "post_id": 1,
  "author": "Jane Smith",
  "content": "This is my comment on the post",
  "created_at": "2024-01-15T14:40:00.000Z"
}
```

### Delete Comment
```bash
curl -X DELETE http://localhost:3000/api/comments/1
```

**Expected Response:**
```json
{
  "message": "Comment deleted successfully"
}
```

## 3. Error Cases

### Get Non-existent Post
```bash
curl http://localhost:3000/api/posts/9999
```

**Expected Response (404):**
```json
{
  "error": "Post not found"
}
```

### Create Post with Missing Fields
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Incomplete Post"
  }'
```

**Expected Response (400):**
```json
{
  "error": "Title, content, and author are required"
}
```

### Add Comment to Non-existent Post
```bash
curl -X POST http://localhost:3000/api/comments/posts/9999 \
  -H "Content-Type: application/json" \
  -d '{
    "author": "Test",
    "content": "Test comment"
  }'
```

**Expected Response (404):**
```json
{
  "error": "Post not found"
}
```

## 4. Using Postman

### Import Collection

Create a new Postman collection with these requests:

1. **Get All Posts**
   - Method: GET
   - URL: `http://localhost:3000/api/posts`

2. **Get Single Post**
   - Method: GET
   - URL: `http://localhost:3000/api/posts/1`

3. **Create Post**
   - Method: POST
   - URL: `http://localhost:3000/api/posts`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "title": "Test Post",
       "content": "Test content",
       "author": "Test Author"
     }
     ```

4. **Update Post**
   - Method: PUT
   - URL: `http://localhost:3000/api/posts/1`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "title": "Updated Test Post"
     }
     ```

5. **Delete Post**
   - Method: DELETE
   - URL: `http://localhost:3000/api/posts/1`

6. **Get Comments**
   - Method: GET
   - URL: `http://localhost:3000/api/comments/posts/1`

7. **Add Comment**
   - Method: POST
   - URL: `http://localhost:3000/api/comments/posts/1`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "author": "Comment Author",
       "content": "Comment text"
     }
     ```

8. **Delete Comment**
   - Method: DELETE
   - URL: `http://localhost:3000/api/comments/1`

## 5. Using JavaScript/Fetch

### Get All Posts
```javascript
fetch('http://localhost:3000/api/posts')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### Create New Post
```javascript
fetch('http://localhost:3000/api/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'New Post',
    content: 'Post content',
    author: 'Author Name'
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### Update Post
```javascript
fetch('http://localhost:3000/api/posts/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Updated Title'
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### Delete Post
```javascript
fetch('http://localhost:3000/api/posts/1', {
  method: 'DELETE'
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

## 6. PowerShell Testing (Windows)

### Get All Posts
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/posts" -Method Get
```

### Create Post
```powershell
$body = @{
    title = "PowerShell Post"
    content = "Created from PowerShell"
    author = "PS User"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/posts" -Method Post -Body $body -ContentType "application/json"
```

### Update Post
```powershell
$body = @{
    title = "Updated from PowerShell"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/posts/1" -Method Put -Body $body -ContentType "application/json"
```

### Delete Post
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/posts/1" -Method Delete
```

## 7. Response Status Codes

- `200 OK` - Successful GET, PUT requests
- `201 Created` - Successful POST requests
- `400 Bad Request` - Missing required fields
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## 8. Testing Workflow

### Complete Test Scenario:

1. **Get all posts** (should show sample data)
2. **Create a new post** (should return new post with ID)
3. **Get the new post by ID** (should show the created post)
4. **Update the post** (should show updated fields)
5. **Add a comment to the post** (should return new comment)
6. **Get all comments for the post** (should show the new comment)
7. **Delete the comment** (should confirm deletion)
8. **Delete the post** (should confirm deletion)
9. **Try to get the deleted post** (should return 404)

### Sample Test Script (Node.js)
```javascript
const API_URL = 'http://localhost:3000/api';

async function runTests() {
  try {
    // 1. Get all posts
    console.log('1. Getting all posts...');
    let response = await fetch(`${API_URL}/posts`);
    let posts = await response.json();
    console.log(`Found ${posts.length} posts`);

    // 2. Create new post
    console.log('\n2. Creating new post...');
    response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Test Post',
        content: 'This is a test',
        author: 'Tester'
      })
    });
    const newPost = await response.json();
    console.log('Created post:', newPost);

    // 3. Add comment
    console.log('\n3. Adding comment...');
    response = await fetch(`${API_URL}/comments/posts/${newPost.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        author: 'Commenter',
        content: 'Great post!'
      })
    });
    const newComment = await response.json();
    console.log('Created comment:', newComment);

    // 4. Get comments
    console.log('\n4. Getting comments...');
    response = await fetch(`${API_URL}/comments/posts/${newPost.id}`);
    const comments = await response.json();
    console.log(`Found ${comments.length} comment(s)`);

    // 5. Delete comment
    console.log('\n5. Deleting comment...');
    response = await fetch(`${API_URL}/comments/${newComment.id}`, {
      method: 'DELETE'
    });
    console.log(await response.json());

    // 6. Delete post
    console.log('\n6. Deleting post...');
    response = await fetch(`${API_URL}/posts/${newPost.id}`, {
      method: 'DELETE'
    });
    console.log(await response.json());

    console.log('\n✅ All tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

runTests();
```

Save this as `test.js` and run with: `node test.js`

