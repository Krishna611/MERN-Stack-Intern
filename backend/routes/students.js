const express = require('express');
const { Student, User } = require('../models');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/', authMiddleware('admin'), async (req, res) => {
  const students = await Student.findAll();
  res.json(students);
});

router.post('/', authMiddleware('admin'), async (req, res) => {
  const { name, email, course } = req.body;
  const student = await Student.create({ name, email, course });
  res.json(student);
});

router.put('/:id', authMiddleware('admin'), async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found' });
  await student.update(req.body);
  res.json(student);
});

router.delete('/:id', authMiddleware('admin'), async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found' });
  await student.destroy();
  res.json({ message: 'Deleted' });
});

router.get('/me', authMiddleware(), async (req, res) => {
  const student = await Student.findOne({ where: { userId: req.user.id } });
  res.json(student);
});

router.put('/me', authMiddleware(), async (req, res) => {
  const student = await Student.findOne({ where: { userId: req.user.id } });
  if (!student) return res.status(404).json({ message: 'Student not found' });
  await student.update(req.body);
  res.json(student);
});

module.exports = router;