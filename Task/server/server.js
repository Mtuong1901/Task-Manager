const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use('/img', express.static(path.join(__dirname, 'img')));
// Kết nối đến cơ sở dữ liệu MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'taskmanager',
  connectionLimit: 10
});

// Lấy tất cả các mục từ cơ sở dữ liệu
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get('/duan', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM du_an ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/duan/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM du_an WHERE id = ?', [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/task', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM task ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/task/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM task WHERE id = ?', [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/nhanvien',async(req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM nhan_vien ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/nhanvien/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM nhan_vien WHERE id = ?', [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'staff not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
