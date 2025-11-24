const sql = require('mssql');

const config = {
  server: process.env.DB_SERVER,                      // solo la IP o hostname
  port: parseInt(process.env.DB_PORT || '1433', 10),  // puerto separado
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: {
    encrypt: false,                // o true si usas TLS
    trustServerCertificate: true,  // para evitar problemas de certificado
  },
  pool: {
    min: parseInt(process.env.DB_POOL_MIN || '0', 10),
    max: parseInt(process.env.DB_POOL_MAX || '10', 10),
    idleTimeoutMillis: parseInt(process.env.DB_TIMEOUT || '30000', 10),
  },
  connectionTimeout: parseInt(process.env.DB_TIMEOUT || '30000', 10),
  requestTimeout: parseInt(process.env.DB_TIMEOUT || '30000', 10),
};

module.exports = {
  sql,
  config,
};

