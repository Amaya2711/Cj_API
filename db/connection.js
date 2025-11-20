const sql = require('mssql');

const config = {
  server: process.env.DB_SERVER || '161.132.48.29',
  port: parseInt((process.env.DB_SERVER || '161.132.48.29,8966').split(',')[1] || '8966'),
  database: process.env.DB_DATABASE || 'JC_Db',
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || '@3IS0@ejwU4A7VOHba990',
  options: {
    trustServerCertificate: process.env.DB_TRUST_CERT === 'true' || true
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
