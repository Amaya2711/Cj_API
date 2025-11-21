const express = require('express');
const { sql, config } = require('../db/connection');
const app = express();
app.use(express.json());

// SELECT endpoint
app.post('/api/select', async (req, res) => {
  const { sql: customSql } = req.body;
  if (!customSql) {
    return res.status(400).json({ error: "El parámetro 'sql' es requerido." });
  }
  try {
    await sql.connect(config);
    const result = await sql.query(customSql);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// INSERT endpoint
app.post('/api/insert', async (req, res) => {
  const { sql: customSql, table, data } = req.body;
  try {
    await sql.connect(config);
    let query;
    if (customSql) {
      query = customSql;
    } else {
      const columns = Object.keys(data).join(',');
      const values = Object.values(data).map(v => `'${v}'`).join(',');
      query = `INSERT INTO ${table} (${columns}) VALUES (${values})`;
    }
    await sql.query(query);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE endpoint
app.post('/api/update', async (req, res) => {
  const { sql: customSql, table, data, where } = req.body;
  try {
    await sql.connect(config);
    let query;
    if (customSql) {
      query = customSql;
    } else {
      const set = Object.entries(data).map(([k, v]) => `${k}='${v}'`).join(',');
      query = `UPDATE ${table} SET ${set} ${where ? 'WHERE ' + where : ''}`;
    }
    await sql.query(query);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
