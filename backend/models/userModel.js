const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  async findByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },

  async create(user) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [user.name, user.email, hashedPassword, user.role || 'user']
    );
    return result.rows[0];
  },

  async findById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }
};

module.exports = User;
