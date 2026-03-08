// PM2 ecosystem configuration file
// This file configures how PM2 manages the application process

module.exports = {
  apps: [{
    name: 'greenengine',
    script: './dist/index.js',

    // Instances - number of app instances to run
    // Set to 1 for SQLite (SQLite doesn't handle concurrent writes well)
    // For PostgreSQL, you can use 'max' or a number like 2-4
    instances: 1,
    exec_mode: 'fork', // Use 'cluster' for multiple instances

    // Environment variables
    env: {
      NODE_ENV: 'production',
      PORT: 5000,
      DATABASE_URL: './data/production.db',
      SESSION_SECRET: process.env.SESSION_SECRET || 'change-this-secret-in-production'
    },

    // Logging
    error_file: './logs/error.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,

    // Auto-restart configuration
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',

    // Memory management
    max_memory_restart: '500M', // Restart if memory exceeds this

    // Watch for file changes (disable in production)
    watch: false,

    // Ignore these files/folders when watching
    ignore_watch: [
      'node_modules',
      'logs',
      'data',
      'uploads',
      '.git'
    ],

    // Wait time before restart
    wait_ready: true,
    listen_timeout: 10000,
    kill_timeout: 5000,

    // Restart delay
    restart_delay: 4000
  }]
};
