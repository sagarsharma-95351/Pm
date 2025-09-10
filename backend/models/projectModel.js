const pool = require('../config/db');

const Project = {
  async getAll() {
    const result = await pool.query('SELECT * FROM projects');
    return result.rows;
  },

  async getById(id) {
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
    return result.rows[0];
  },

  async create(project) {
    const result = await pool.query(
      'INSERT INTO projects (name, description, owner_id) VALUES ($1, $2, $3) RETURNING *',
      [project.name, project.description, project.owner_id]
    );
    return result.rows[0];
  }
};

module.exports = Project;
