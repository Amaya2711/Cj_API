const sql = require('mssql');

let server = process.env.DB_SERVER || 'cj-cpa86x2pp-amaya2711s-projects.vercel.app';
let port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined;
if (server.includes(',')) {
  const parts = server.split(',');
  server = parts[0];
  port = parseInt(parts[1]);
}
if (!port) port = 1433;

const config = {
  server,
  port,
  database: process.env.DB_DATABASE || 'n8n_produccion',
  user: process.env.DB_USER || 'SA',
  password: process.env.DB_PASSWORD || '7@1l6DknPRBHhtJ6eg32xss',
  options: {
    trustServerCertificate: process.env.DB_TRUST_CERT === 'false' || true
  },
  pool: {
    min: parseInt(process.env.DB_POOL_MIN || '0'),
    max: parseInt(process.env.DB_POOL_MAX || '100'),
    idleTimeoutMillis: parseInt(process.env.DB_TIMEOUT || '30000')
  },
  connectionTimeout: parseInt(process.env.DB_TIMEOUT || '30000')
};

module.exports = {
  sql,
  config
};
