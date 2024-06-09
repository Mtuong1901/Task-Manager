const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
const secretKey = 'your-secret-key';

// Kết nối đến cơ sở dữ liệu MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'taskmanager',
  connectionLimit: 10
});

pool.getConnection()
  .then(conn => {
    console.log('Connected to MySQL database.');
    conn.release();
  })
  .catch(err => {
    console.error('Unable to connect to MySQL database:', err);
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
app.get('/user', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users ORDER BY id DESC');
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

// Xử lý yêu cầu POST đến /task
app.post('/task', async (req, res) => {
  try {
    const newTask = req.body; // Trích xuất thông tin về công việc từ 
    // Phản hồi với thông điệp thành công
    console.log("da them thanh cong");
    console.log(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Có lỗi xảy ra trong quá trình thêm công việc:', error);
    // Phản hồi với thông điệp lỗi nếu có lỗi xảy ra
    res.status(500).json({ error: 'Không thể thêm công việc. Vui lòng thử lại sau.' });
  }
});
app.get('/nhanvien', async (req, res) => {
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

app.post('/nhanvien', async (req, res) => {
  try {
    const { ten_nv, gioi_tinh, ngay_sinh, khu_vuc, hinh_anh } = req.body;

    if (!ten_nv || !gioi_tinh || !ngay_sinh || !khu_vuc || !hinh_anh) {
      return res.status(400).json({ error: 'Tất cả các trường là bắt buộc' });
    }

    const [result] = await pool.query(
      'INSERT INTO nhan_vien (ten_nv, gioi_tinh, ngay_sinh, khu_vuc, hinh_anh) VALUES (?, ?, ?, ?, ?)',
      [ten_nv, gioi_tinh, ngay_sinh, khu_vuc, hinh_anh]
    );

    const newStaffId = result.insertId;
    const [newStaff] = await pool.query('SELECT * FROM nhan_vien WHERE id = ?', [newStaffId]);

    res.status(201).json(newStaff[0]);
  } catch (error) {
    console.error('Có lỗi xảy ra trong quá trình thêm nhân viên:', error);
    res.status(500).json({ error: 'Không thể thêm nhân viên. Vui lòng thử lại sau.' });
  }
});app.post('/nhanvien', async (req, res) => {
  try {
    const { ten_nv, gioi_tinh, ngay_sinh, khu_vuc, hinh_anh } = req.body;

    if (!ten_nv || !gioi_tinh || !ngay_sinh || !khu_vuc || !hinh_anh) {
      return res.status(400).json({ error: 'Tất cả các trường là bắt buộc' });
    }

    const [result] = await pool.query(
      'INSERT INTO nhan_vien (ten_nv, gioi_tinh, ngay_sinh, khu_vuc, hinh_anh) VALUES (?, ?, ?, ?, ?)',
      [ten_nv, gioi_tinh, ngay_sinh, khu_vuc, hinh_anh]
    );

    const newStaffId = result.insertId;
    const [newStaff] = await pool.query('SELECT * FROM nhan_vien WHERE id = ?', [newStaffId]);

    res.status(201).json(newStaff[0]);
  } catch (error) {
    console.error('Có lỗi xảy ra trong quá trình thêm nhân viên:', error);
    res.status(500).json({ error: 'Không thể thêm nhân viên. Vui lòng thử lại sau.' });
  }
});
app.delete('/nhanvien/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'ID nhân viên là bắt buộc' });
    }
    const query = 'DELETE FROM nhan_vien WHERE id = ?';
    const [result] = await pool.query(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Không tìm thấy nhân viên với ID đã cho' });
    }
    res.status(200).json({ message: 'Nhân viên đã được xóa thành công' });
  } catch (error) {
    console.error('Có lỗi xảy ra trong quá trình xóa nhân viên:', error);
    res.status(500).json({ error: 'Không thể xóa nhân viên. Vui lòng thử lại sau.' });
  }
});
// Xác thực người dùng và tạo token JWT
app.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    // Kiểm tra xem username có tồn tại trong cơ sở dữ liệu không
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ? and password =?', [username,password]);
    
    if (rows.length > 0) {
      // Username và password tồn tại trong cơ sở dữ liệu
      console.log('Login successful');
      // Tạo token JWT
      const token = jwt.sign({ username,password }, secretKey, { expiresIn: '1h' });
      console.log(token);
      res.status(200).json({ message: 'Login successful', token });
    } else {
      // Không tìm thấy username hoặc password không đúng
      console.log('Invalid username or password');
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during login:');
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Middleware để xác thực token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401); // Unauthorized
  
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next();
  });
}

// Sử dụng middleware authenticateToken để xác thực token
app.get('/protected', authenticateToken, (req, res) => {
  // Nếu token hợp lệ, tiếp tục xử lý request
  res.json({ message: 'Authenticated successfully' });
});
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
