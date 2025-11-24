const express = require('express');
const { sql, config } = require('../db/connection');
const app = express();
app.use(express.json());

//
// ====================================================
//   STORED PROCEDURE endpoint
// ====================================================
//
app.post('/api/stored-procedure', async (req, res) => {
  const { procedure, params } = req.body;

  if (!procedure) {
    return res.status(400).json({ error: "El parámetro 'procedure' es requerido." });
  }

  try {
    await sql.connect(config);

    const request = new sql.Request();

    // Cargar parámetros dinámicamente
    if (params && typeof params === 'object') {
      for (const [key, value] of Object.entries(params)) {
        // Se asume tipo automático, si necesitas tipo INT:
        // request.input(key, sql.Int, value);
        request.input(key, value);
      }
    }

    const result = await request.execute(procedure);

    res.json(result.recordset || { success: true });

  } catch (err) {
    console.error('ERROR SP:', err);
    res.status(500).json({ error: err.message, detail: err });
  }
});

//
// ====================================================
//   SELECT endpoint
// ====================================================
//
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

//
// ====================================================
//   INSERT endpoint
// ====================================================
//
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

//
// ====================================================
//   UPDATE endpoint
// ====================================================
//
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


//
// EXPORTAR APP PARA VERCEL
//
module.exports = app;


//
// SOLO PARA EJECUCIÓN LOCAL
//
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`API running on port ${port}`));
}
