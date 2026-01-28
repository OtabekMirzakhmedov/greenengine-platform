# Quick Start Deployment Guide

This is a condensed version for quick reference. See `DEPLOYMENT.md` for detailed instructions.

## One-Time Server Setup

### 1. Install Required Software

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 and Nginx
sudo npm install -g pm2
sudo apt install -y nginx git
```

### 2. Deploy Application

```bash
# Clone repository
git clone <YOUR_REPO_URL> /home/yourusername/app
cd /home/yourusername/app

# Setup environment
cp .env.example .env
nano .env  # Edit with your production values

# Make scripts executable
chmod +x deploy.sh backup.sh

# Run deployment
./deploy.sh
```

### 3. Configure Nginx

```bash
# Copy nginx config
sudo cp nginx.conf /etc/nginx/sites-available/greenengine

# Edit domain name in config
sudo nano /etc/nginx/sites-available/greenengine
# Change 'yourdomain.com' to your actual domain

# Enable site
sudo ln -s /etc/nginx/sites-available/greenengine /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 4. Setup SSL

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 5. Setup Firewall

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 6. Setup Automatic Backups

```bash
# Edit crontab
crontab -e

# Add this line (daily backup at 2 AM)
0 2 * * * /home/yourusername/app/backup.sh >> /home/yourusername/app/backup.log 2>&1
```

## Updating the Application

```bash
cd /home/yourusername/app
./deploy.sh
```

## Important Files

- **DEPLOYMENT.md** - Full deployment guide
- **ecosystem.config.cjs** - PM2 configuration
- **nginx.conf** - Nginx reverse proxy configuration
- **deploy.sh** - Automated deployment script
- **backup.sh** - Database backup script
- **.env.example** - Environment variables template

## Default Credentials

After deployment, login with:
- **Email:** admin@greenengine.org
- **Password:** admin123

**IMPORTANT:** Change this password immediately after first login!

## Useful Commands

```bash
# Application management
pm2 status              # View app status
pm2 logs greenengine    # View logs
pm2 restart greenengine # Restart app
pm2 monit              # Monitor app

# Nginx
sudo systemctl status nginx
sudo systemctl reload nginx
sudo nginx -t

# View logs
pm2 logs greenengine
sudo tail -f /var/log/nginx/error.log

# Manual backup
./backup.sh

# Update application
git pull && ./deploy.sh
```

## Environment Variables (.env)

```env
DATABASE_URL=/path/to/app/data/production.db
PORT=5000
NODE_ENV=production
SESSION_SECRET=your-secure-random-string-here
```

Generate secure session secret:
```bash
openssl rand -base64 32
```

## Troubleshooting

### Application won't start
```bash
pm2 logs greenengine
```

### Check if port is in use
```bash
sudo lsof -i :5000
```

### Database permission issues
```bash
chmod 755 data/
chmod 644 data/production.db
```

### Nginx configuration test
```bash
sudo nginx -t
```

## Directory Structure

```
/home/yourusername/app/
├── data/              # Database files
├── uploads/           # User uploaded files
├── logs/              # Application logs
├── backups/           # Database backups
├── dist/              # Built application (created by build)
└── node_modules/      # Dependencies
```

## Need Help?

Refer to the complete `DEPLOYMENT.md` guide for detailed instructions and troubleshooting.
