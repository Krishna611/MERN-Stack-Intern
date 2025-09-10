const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(cors());
app.use(express.json());

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Models
const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'student' }
});

const Student = sequelize.define('Student', {
  course: DataTypes.STRING,
  enrollmentDate: DataTypes.DATE
});

User.hasOne(Student);
Student.belongsTo(User);

// Sync DB
sequelize.sync().then(async () => {
  console.log('Database synced');

  // Create default admin
  const admin = await User.findOne({ where: { email: 'admin@example.com' } });
  if (!admin) {
    const hashed = await bcrypt.hash('admin123', 10);
    await User.create({ name: 'Admin', email: 'admin@example.com', password: hashed, role: 'admin' });
    console.log('Default admin created: admin@example.com / admin123');
  }

  // Create default student
  const student = await User.findOne({ where: { email: 'student@example.com' } });
  if (!student) {
    const hashed = await bcrypt.hash('student123', 10);
    const newStudent = await User.create({ name: 'Student', email: 'student@example.com', password: hashed, role: 'student' });
    await Student.create({ course: 'MERN Bootcamp', enrollmentDate: new Date(), UserId: newStudent.id });
    console.log('Default student created: student@example.com / student123');
  }
});

// Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email }, include: Student });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id, role: user.role }, 'secret');
    res.json({ token, user: { id: user.id, role: user.role, name: user.name, email: user.email } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Login failed' });
  }
});

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, course } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role: 'student' });
    await Student.create({ course, enrollmentDate: new Date(), UserId: user.id });

    const token = jwt.sign({ id: user.id, role: user.role }, 'secret');
    res.status(201).json({ token, user: { id: user.id, role: user.role, name: user.name, email: user.email } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Signup failed' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
