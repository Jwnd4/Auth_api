const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
app.use(express.json());

// 数据库连接
const uri = process.env.MONGODB_URI;  // 后续配置环境变量
const client = new MongoClient(uri);
let db;

// 初始化数据库连接
async function connectDB() {
  try {
    await client.connect();
    db = client.db('auth_system');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('DB connection error:', err);
  }
}
connectDB();

// 验证接口（接收HWID+用户名+密码）
app.post('/', async (req, res) => {
  const { hwid, username, password } = req.body;
  
  if (!hwid || !username || !password) {
    return res.status(400).json({ valid: false, error: 'Missing data' });
  }

  try {
    // 查询数据库中是否存在匹配的记录
    const user = await db.collection('users').findOne({
      hwid: hwid,
      username: username,
      password: password
    });

    if (user) {
      res.json({ valid: true, message: '验证通过' });
    } else {
      res.json({ valid: false, error: 'HWID、用户名或密码不正确' });
    }
  } catch (err) {
    res.status(500).json({ valid: false, error: '服务器错误' });
  }
});

module.exports = app;