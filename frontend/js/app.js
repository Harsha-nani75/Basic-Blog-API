// API Base URL
const API_BASE = '/api';

// DOM Elements
const postsList = document.getElementById('postsList');
const postModal = document.getElementById('postModal');
const postDetailModal = document.getElementById('postDetailModal');
const postForm = document.getElementById('postForm');
const commentForm = document.getElementById('commentForm');
const newPostBtn = document.getElementById('newPostBtn');

// State
let currentPostId = null;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    // New post button
    newPostBtn.addEventListener('click', () => {
        openPostModal();
    });

    // Close modals
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModal);
    });

    // Click outside modal to close
    window.addEventListener('click', (e) => {
        if (e.target === postModal) {
            closeModal();
        }
        if (e.target === postDetailModal) {
            closeModal();
        }
    });

    // Post form submission
    postForm.addEventListener('submit', handlePostSubmit);

    // Comment form submission
    commentForm.addEventListener('submit', handleCommentSubmit);
}

// Load all posts
async function loadPosts() {
    try {
        postsList.innerHTML = '<div class="loading">Loading posts...</div>';
        
        const response = await fetch(`${API_BASE}/posts`);
        const posts = await response.json();
        
        if (posts.length === 0) {
            postsList.innerHTML = '<div class="loading">No posts yet. Create your first post!</div>';
            return;
        }
        
        postsList.innerHTML = posts.map(post => createPostCard(post)).join('');
    } catch (error) {
        console.error('Error loading posts:', error);
        postsList.innerHTML = '<div class="loading">Error loading posts. Please try again.</div>';
    }
}

// Create post card HTML
function createPostCard(post) {
    const date = new Date(post.created_at).toLocaleDateString();
    return `
        <div class="post-card">
            <h3>${escapeHtml(post.title)}</h3>
            <div class="post-meta">
                By ${escapeHtml(post.author)} • ${date}
            </div>
            <div class="post-content">
                ${escapeHtml(post.content.substring(0, 200))}${post.content.length > 200 ? '...' : ''}
            </div>
            <div class="post-actions">
                <button class="btn btn-primary btn-small" onclick="viewPost(${post.id})">View</button>
                <button class="btn btn-secondary btn-small" onclick="editPost(${post.id})">Edit</button>
                <button class="btn btn-danger btn-small" onclick="deletePost(${post.id})">Delete</button>
            </div>
        </div>
    `;
}

// View post details
async function viewPost(postId) {
    try {
        const response = await fetch(`${API_BASE}/posts/${postId}`);
        const post = await response.json();
        
        const date = new Date(post.created_at).toLocaleDateString();
        const updatedDate = new Date(post.updated_at).toLocaleDateString();
        
        document.getElementById('postDetail').innerHTML = `
            <h2>${escapeHtml(post.title)}</h2>
            <div class="post-meta">
                By ${escapeHtml(post.author)} • Created: ${date}${post.updated_at !== post.created_at ? ` • Updated: ${updatedDate}` : ''}
            </div>
            <div class="post-content">
                ${escapeHtml(post.content).replace(/\n/g, '<br>')}
            </div>
        `;
        
        document.getElementById('commentPostId').value = postId;
        currentPostId = postId;
        
        await loadComments(postId);
        postDetailModal.style.display = 'block';
    } catch (error) {
        console.error('Error loading post:', error);
        alert('Error loading post details');
    }
}

// Load comments for a post
async function loadComments(postId) {
    try {
        const response = await fetch(`${API_BASE}/comments/posts/${postId}`);
        const comments = await response.json();
        
        const commentsList = document.getElementById('commentsList');
        
        if (comments.length === 0) {
            commentsList.innerHTML = '<div class="loading">No comments yet. Be the first to comment!</div>';
            return;
        }
        
        commentsList.innerHTML = comments.map(comment => createCommentCard(comment)).join('');
    } catch (error) {
        console.error('Error loading comments:', error);
        document.getElementById('commentsList').innerHTML = '<div class="loading">Error loading comments</div>';
    }
}

// Create comment card HTML
function createCommentCard(comment) {
    const date = new Date(comment.created_at).toLocaleDateString();
    return `
        <div class="comment">
            <div class="comment-author">${escapeHtml(comment.author)}</div>
            <div class="comment-content">${escapeHtml(comment.content).replace(/\n/g, '<br>')}</div>
            <div class="comment-meta">${date}</div>
        </div>
    `;
}

// Open post modal for creating/editing
function openPostModal(postId = null) {
    document.getElementById('modalTitle').textContent = postId ? 'Edit Post' : 'Create New Post';
    document.getElementById('postId').value = postId || '';
    
    if (postId) {
        // Load post data for editing
        fetch(`${API_BASE}/posts/${postId}`)
            .then(response => response.json())
            .then(post => {
                document.getElementById('title').value = post.title;
                document.getElementById('author').value = post.author;
                document.getElementById('content').value = post.content;
            })
            .catch(error => {
                console.error('Error loading post for edit:', error);
            });
    } else {
        // Clear form for new post
        postForm.reset();
    }
    
    postModal.style.display = 'block';
}

// Edit post
function editPost(postId) {
    openPostModal(postId);
}

// Handle post form submission
async function handlePostSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const postData = {
        title: formData.get('title'),
        author: formData.get('author'),
        content: formData.get('content')
    };
    
    const postId = formData.get('postId');
    
    try {
        const url = postId ? `${API_BASE}/posts/${postId}` : `${API_BASE}/posts`;
        const method = postId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData)
        });
        
        if (response.ok) {
            closeModal();
            loadPosts();
            alert(postId ? 'Post updated successfully!' : 'Post created successfully!');
        } else {
            const error = await response.json();
            alert('Error: ' + error.error);
        }
    } catch (error) {
        console.error('Error saving post:', error);
        alert('Error saving post. Please try again.');
    }
}

// Handle comment form submission
async function handleCommentSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const commentData = {
        author: formData.get('author'),
        content: formData.get('content')
    };
    
    try {
        const response = await fetch(`${API_BASE}/comments/posts/${currentPostId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData)
        });
        
        if (response.ok) {
            commentForm.reset();
            await loadComments(currentPostId);
            alert('Comment added successfully!');
        } else {
            const error = await response.json();
            alert('Error: ' + error.error);
        }
    } catch (error) {
        console.error('Error adding comment:', error);
        alert('Error adding comment. Please try again.');
    }
}

// Delete post
async function deletePost(postId) {
    if (!confirm('Are you sure you want to delete this post?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/posts/${postId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            loadPosts();
            alert('Post deleted successfully!');
        } else {
            const error = await response.json();
            alert('Error: ' + error.error);
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        alert('Error deleting post. Please try again.');
    }
}

// Close modal
function closeModal() {
    postModal.style.display = 'none';
    postDetailModal.style.display = 'none';
    postForm.reset();
    commentForm.reset();
    currentPostId = null;
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
