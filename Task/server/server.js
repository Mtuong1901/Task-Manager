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
app.delete('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';
    const [result] = await pool.query(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Không tìm thấy user với ID đã cho' });
    }
    res.status(200).json({ message: 'User đã được xóa thành công' });
  } catch (error) {
    console.error('Có lỗi xảy ra trong quá trình xóa user: ', error);
    res.status(500).json({ error: 'Không thể xóa user. Vui lòng thử lại sau.' });
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
app.post('/duan', async (req, res) => {
  const { ten,ngay_bat_dau,nhom_truong,thanh_vien,hinh_anh } = req.body;
  try {
    const formatted_ngay_bat_dau = new Date(ngay_bat_dau).toISOString().split('T')[0];
    const [result] = await pool.query(
      'INSERT INTO du_an (ten,ngay_bat_dau,nhom_truong,thanh_vien,hinh_anh) VALUES (?, ?, ?, ?, ?)',
      [ten,formatted_ngay_bat_dau,nhom_truong,thanh_vien,hinh_anh]
    );
    console.log('them du an thanh cong');
    console.log(result);
    res.status(200).json({ message: 'Added project!' });
  } catch (error) {
    console.error('Fail to create project:', error);
    res.status(500).json({ message: 'failed create project!' });
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

    

    res.status(201).json(result);
  } catch (error) {
    console.error('Có lỗi xảy ra trong quá trình thêm nhân viên:', error);
    res.status(500).json({ error: 'Không thể thêm nhân viên. Vui lòng thử lại sau.' });
  }
})
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
app.get('/nhanvien/edit/:id', async (req, res) => {
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
app.put('/nhanvien/edit/:id', (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const query = `
    UPDATE nhan_vien
    SET ten_nv = ?, ngay_sinh = ?, gioi_tinh = ?, khu_vuc = ?, hinh_anh = ?
    WHERE id = ?;
  `;

  const values = [
    updatedData.ten_nv,
    updatedData.ngay_sinh,
    updatedData.gioi_tinh,
    updatedData.khu_vuc,
    updatedData.hinh_anh,
    id
  ];

  pool.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).send({ message: 'Đã xảy ra lỗi khi cập nhật thông tin nhân viên', error: err });
    }

    if (results.affectedRows === 0) {
      return res.status(404).send({ message: 'Nhân viên không tồn tại' });
    }

    res.send({ message: 'Cập nhật thông tin nhân viên thành công' });
  });
});
app.delete('/duan/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM du_an WHERE id = ?';
    const [result] = await pool.query(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Không tìm thấy du an với ID đã cho' });
    }
    res.status(200).json({ message: 'Du an đã được xóa thành công' });
  } catch (error) {
    console.error('Có lỗi xảy ra trong quá trình xóa du an:', error);
    res.status(500).json({ error: 'Không thể xóa du an. Vui lòng thử lại sau.' });
  }
});
app.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ? and password =?', [username,password]);
    
    if (rows.length > 0) {
      console.log('Login successful');
      const { role } = rows[0];
      const token = jwt.sign({ username,password,role }, secretKey, { expiresIn: '1h' });
      console.log(token);
      res.status(200).json({ message: 'Login successful', token });
    } else {
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

app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Authenticated successfully' });
});
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, password]
    );
    console.log('Đăng ký thành công');
    console.log(result);
    res.status(200).json({ message: 'Đăng ký thành công!' });
  } catch (error) {
    console.error('Đăng ký thất bại:', error);
    res.status(500).json({ message: 'Đăng ký thất bại!' });
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
