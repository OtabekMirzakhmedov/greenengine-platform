#!/bin/bash

# GreenEngine Database Backup Script
# This script creates backups of the SQLite database and uploaded files

set -e

# Configuration
BACKUP_DIR="./backups"
DB_PATH="./data/production.db"
UPLOADS_PATH="./uploads"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=7

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

echo "========================================"
echo "GreenEngine Backup - $DATE"
echo "========================================"

# Backup database
if [ -f "$DB_PATH" ]; then
    echo "Backing up database..."
    cp "$DB_PATH" "$BACKUP_DIR/database_$DATE.db"
    echo "✓ Database backup completed: database_$DATE.db"
else
    echo "⚠ Database file not found at $DB_PATH"
fi

# Backup uploads directory
if [ -d "$UPLOADS_PATH" ]; then
    echo "Backing up uploads directory..."
    tar -czf "$BACKUP_DIR/uploads_$DATE.tar.gz" -C "$UPLOADS_PATH" .
    echo "✓ Uploads backup completed: uploads_$DATE.tar.gz"
else
    echo "⚠ Uploads directory not found at $UPLOADS_PATH"
fi

# Remove old backups (older than RETENTION_DAYS)
echo "Cleaning up old backups (older than $RETENTION_DAYS days)..."
find "$BACKUP_DIR" -name "database_*.db" -mtime +$RETENTION_DAYS -delete
find "$BACKUP_DIR" -name "uploads_*.tar.gz" -mtime +$RETENTION_DAYS -delete
echo "✓ Old backups cleaned up"

# Calculate backup size
BACKUP_SIZE=$(du -sh "$BACKUP_DIR" | cut -f1)
echo ""
echo "Total backup size: $BACKUP_SIZE"
echo "Backup location: $BACKUP_DIR"
echo "========================================"
echo "Backup completed successfully!"
echo "========================================"
