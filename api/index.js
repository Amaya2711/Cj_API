const express = require('express');
const { sql, config } = require('../db/connection');

const app = express();

// =========================
// MIDDLEWARES
// =========================
app.use(express.json());

// =========================
// SELECT
// =========================
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
    console.error('ERROR SELECT:', err);
    res.status(500).json({ error: err.message });
  }
});

// =========================
// INSERT
// =========================
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
    console.error('ERROR INSERT:', err);
    res.status(500).json({ error: err.message });
  }
});

// =========================
// UPDATE
// =========================
app.post('/api/update', async (req, res) => {
  const { sql: customSql, table, data, where } = req.body;

  try {
    await sql.connect(config);

    let query;
    if (customSql) {
      query = customSql;
    } else {
      const set = Object.entries(data)
        .map(([k, v]) => `${k}='${v}'`)
        .join(',');
      query = `UPDATE ${table} SET ${set} ${where ? 'WHERE ' + where : ''}`;
    }

    await sql.query(query);
    res.json({ success: true });
  } catch (err) {
    console.error('ERROR UPDATE:', err);
    res.status(500).json({ error: err.message });
  }
});

// =========================
// STORED PROCEDURE
// =========================
app.post('/api/stored-procedure', async (req, res) => {
  const { procedure, params, parameters } = req.body;
  const inputParams = params || parameters;

  if (!procedure) {
    return res.status(400).json({ error: "El parámetro 'procedure' es requerido." });
  }

  try {
    await sql.connect(config);
    const request = new sql.Request();

    if (inputParams && typeof inputParams === 'object') {
      for (const [key, value] of Object.entries(inputParams)) {
        request.input(key, value);
      }
    }

    const result = await request.execute(procedure);
    res.json(result.recordset || { success: true });

  } catch (err) {
    console.error('ERROR SP:', err);
    res.status(500).json({ error: err.message });
  }
});

// =========================
// MANEJO GLOBAL DE ERRORES
// =========================
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    detail: err.message
  });
});

// =========================
// EXPORT PARA VERCEL
// =========================
module.exports = app;

// =========================
// SOLO LOCAL (NO VERCEL)
// =========================
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () =>
    console.log(`API running on port ${port}`)
  );
}

