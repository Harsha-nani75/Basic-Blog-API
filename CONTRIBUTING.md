# Contributing to Basic Blog API

Thank you for considering contributing to Basic Blog API! 🎉

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Your environment (OS, Node version, MySQL version)

### Suggesting Features

We welcome feature suggestions! Please:
- Check existing issues first
- Clearly describe the feature and its benefits
- Provide examples if possible

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow existing code style
   - Add comments where needed
   - Update documentation if needed

4. **Test your changes**
   - Ensure all existing features still work
   - Test new features thoroughly
   - Check for console errors

5. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Describe what you changed and why
   - Reference any related issues

## Development Setup

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

4. **Configure environment**
   ```bash
   cp env.example .env
   # Edit .env with your credentials
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## Code Style

- Use 2 spaces for indentation
- Use meaningful variable names
- Add comments for complex logic
- Follow existing patterns in the codebase

## Database Changes

If you modify the database schema:
1. Update `database.sql`
2. Update `DATABASE_SCHEMA.md`
3. Test with fresh database install
4. Document any migration steps

## Commit Message Guidelines

- **Add:** New feature or functionality
- **Fix:** Bug fix
- **Update:** Changes to existing feature
- **Docs:** Documentation changes
- **Refactor:** Code refactoring
- **Test:** Adding or updating tests

Examples:
```
Add: User authentication with JWT
Fix: Date not displaying on post cards
Update: Improve error handling in API routes
Docs: Add API endpoint examples
```

## Questions?

Feel free to open an issue for any questions about contributing!

Thank you for making Basic Blog API better! 🚀

