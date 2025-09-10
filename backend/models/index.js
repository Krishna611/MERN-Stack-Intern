const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({ dialect: 'sqlite', storage: 'db.sqlite' });

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'student' }
});

const Student = sequelize.define('Student', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  course: DataTypes.STRING,
  enrollmentDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

User.hasOne(Student, { foreignKey: 'userId' });
Student.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, User, Student };