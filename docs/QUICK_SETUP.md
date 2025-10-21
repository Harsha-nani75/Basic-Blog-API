# Quick MySQL Setup

## Option 1: Local MySQL (Recommended for Development)

### Windows
1. **Download**: https://dev.mysql.com/downloads/installer/
2. **Install**: MySQL Installer
3. **Choose**: Developer Default
4. **Set root password** during installation
5. **Complete** the installation

### Create Database
```bash
# Open Command Prompt or PowerShell
mysql -u root -p
# Enter your password when prompted

# In MySQL shell:
CREATE DATABASE blog_api;
exit;

# Import schema and sample data:
mysql -u root -p blog_api < database.sql
```

## Option 2: MySQL Workbench (GUI Method)

1. **Download**: https://dev.mysql.com/downloads/workbench/
2. **Install** MySQL Workbench
3. **Connect** to your MySQL server
4. **Create database**: Click "Create Schema" → Name: `blog_api`
5. **Import**: File → Run SQL Script → Select `database.sql`

## Option 3: XAMPP (Easiest for Beginners)

1. **Download**: https://www.apachefriends.org/
2. **Install** XAMPP
3. **Start** MySQL from XAMPP Control Panel
4. **Open**: http://localhost/phpmyadmin
5. **Create**: New database named `blog_api`
6. **Import**: Click "Import" → Choose `database.sql`

## After Setup

1. **Update .env file**:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=blog_api
```

2. **Install dependencies**:
```bash
npm install
```

3. **Run the server**:
```bash
npm run dev
```

4. **Open browser**:
```
http://localhost:3000
```

## Verify Installation

You should see:
```
✅ Connected to MySQL Database
Server running on port 3000
```

## Troubleshooting

- **Connection refused**: Make sure MySQL service is running
- **Access denied**: Check username/password in .env file
- **Database not found**: Run `database.sql` to create tables
