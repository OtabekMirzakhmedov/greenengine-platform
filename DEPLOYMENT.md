# Deployment Guide for GreenEngine Tech Platform

This guide covers deploying the application to your own server.

## Prerequisites

- Ubuntu/Debian server (20.04 LTS or later recommended)
- Root or sudo access
- Domain name pointing to your server IP
- At least 2GB RAM, 2 CPU cores, 20GB storage

## Server Setup

### 1. Update System

```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Install Node.js (v20.x)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

Verify installation:
```bash
node --version  # Should show v20.x
npm --version
```

### 3. Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

### 4. Install Nginx (Reverse Proxy)

```bash
sudo apt install -y nginx
```

### 5. Install Git (if not already installed)

```bash
sudo apt install -y git
```

## Application Deployment

### 1. Create Application User

```bash
sudo adduser greenengine --disabled-password
sudo usermod -aG sudo greenengine
```

### 2. Clone Repository

```bash
sudo su - greenengine
cd /home/greenengine
git clone <YOUR_REPOSITORY_URL> app
cd app
```

### 3. Install Dependencies

```bash
npm install --production=false
```

### 4. Configure Environment Variables

```bash
cp .env.example .env
nano .env
```

Update the following values:
```env
# Database URL - SQLite database file path
DATABASE_URL=/home/greenengine/app/data/production.db

# Server Port
PORT=5000

# Node Environment
NODE_ENV=production

# Session Secret - CHANGE THIS!
SESSION_SECRET=your-very-secure-random-string-here-generate-with-openssl
```

Generate a secure session secret:
```bash
openssl rand -base64 32
```

### 5. Create Data Directory

```bash
mkdir -p /home/greenengine/app/data
mkdir -p /home/greenengine/app/uploads
```

### 6. Setup Database

```bash
# Push database schema
npm run db:push

# Seed initial data (admin user, partners, news)
node --loader tsx server/seed.ts
```

### 7. Build Application

```bash
npm run build
```

### 8. Setup PM2 Process Manager

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

Follow the instructions from `pm2 startup` command (it will give you a command to run with sudo).

### 9. Configure Nginx

Create Nginx configuration:
```bash
sudo nano /etc/nginx/sites-available/greenengine
```

Copy the contents from `nginx.conf` file in the project root.

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/greenengine /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 10. Setup SSL with Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow the prompts. Certbot will automatically configure SSL and set up auto-renewal.

## Post-Deployment

### Check Application Status

```bash
pm2 status
pm2 logs greenengine
```

### Monitor Logs

```bash
# View logs
pm2 logs

# View specific app logs
pm2 logs greenengine

# View error logs only
pm2 logs greenengine --err
```

### Restart Application

```bash
pm2 restart greenengine
```

### Stop Application

```bash
pm2 stop greenengine
```

## Database Backups

### Automated Backup Script

Create a backup script:
```bash
nano /home/greenengine/backup.sh
```

Add the following content:
```bash
#!/bin/bash
BACKUP_DIR="/home/greenengine/backups"
DB_PATH="/home/greenengine/app/data/production.db"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup database
cp $DB_PATH $BACKUP_DIR/production_$DATE.db

# Keep only last 7 days of backups
find $BACKUP_DIR -name "production_*.db" -mtime +7 -delete

echo "Backup completed: production_$DATE.db"
```

Make it executable:
```bash
chmod +x /home/greenengine/backup.sh
```

Setup daily backups with cron:
```bash
crontab -e
```

Add this line (runs daily at 2 AM):
```
0 2 * * * /home/greenengine/backup.sh >> /home/greenengine/backup.log 2>&1
```

## Updating the Application

### Pull Latest Changes

```bash
cd /home/greenengine/app
git pull origin main  # or your branch name
```

### Install New Dependencies (if any)

```bash
npm install
```

### Update Database Schema (if changed)

```bash
npm run db:push
```

### Rebuild Application

```bash
npm run build
```

### Restart Application

```bash
pm2 restart greenengine
```

## Firewall Configuration

### Setup UFW Firewall

```bash
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
sudo ufw status
```

## Troubleshooting

### Application won't start

1. Check logs:
   ```bash
   pm2 logs greenengine
   ```

2. Check if port 5000 is already in use:
   ```bash
   sudo lsof -i :5000
   ```

3. Verify environment variables:
   ```bash
   cat /home/greenengine/app/.env
   ```

### Database errors

1. Check database file permissions:
   ```bash
   ls -la /home/greenengine/app/data/
   ```

2. Ensure the directory is writable:
   ```bash
   chmod 755 /home/greenengine/app/data
   chmod 644 /home/greenengine/app/data/production.db
   ```

### Nginx errors

1. Check Nginx configuration:
   ```bash
   sudo nginx -t
   ```

2. View Nginx error logs:
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

### Out of memory

1. Check memory usage:
   ```bash
   free -h
   pm2 monit
   ```

2. Add swap space if needed:
   ```bash
   sudo fallocate -l 2G /swapfile
   sudo chmod 600 /swapfile
   sudo mkswap /swapfile
   sudo swapon /swapfile
   ```

## Security Recommendations

1. **Change default admin password** immediately after first login
2. **Keep system updated**: `sudo apt update && sudo apt upgrade`
3. **Use strong SESSION_SECRET** in production
4. **Setup automatic security updates**:
   ```bash
   sudo apt install unattended-upgrades
   sudo dpkg-reconfigure --priority=low unattended-upgrades
   ```
5. **Regular backups**: Ensure backup script runs daily
6. **Monitor logs**: Check PM2 and Nginx logs regularly
7. **Restrict SSH**: Consider using SSH keys only and disabling password authentication

## Performance Optimization

### Enable Nginx Gzip Compression

Already configured in the provided `nginx.conf` file.

### PM2 Cluster Mode (Optional)

For better performance on multi-core servers, edit `ecosystem.config.cjs`:
```javascript
instances: 2,  // or 'max' to use all CPU cores
exec_mode: 'cluster'
```

Then restart:
```bash
pm2 reload greenengine
```

## Monitoring

### Setup PM2 Monitoring (Optional)

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

## Support

For issues or questions, refer to the project documentation or contact the development team.

---

## Quick Reference Commands

```bash
# View application status
pm2 status

# View logs
pm2 logs greenengine

# Restart application
pm2 restart greenengine

# Reload Nginx
sudo systemctl reload nginx

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Backup database manually
cp /home/greenengine/app/data/production.db /home/greenengine/backups/manual_backup_$(date +%Y%m%d).db
```
