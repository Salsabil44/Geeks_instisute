import pool from '../config/db.js';

class UserModel {
  static async getAll() {
    const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async createUser(user, hashedPassword) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const userResult = await client.query(
        'INSERT INTO users (email, username, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *',
        [user.email, user.username, user.first_name, user.last_name]
      );

      await client.query(
        'INSERT INTO hashpwd (username, password) VALUES ($1, $2)',
        [user.username, hashedPassword]
      );

      await client.query('COMMIT');
      return userResult.rows[0];
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  static async updateUser(id, { email, username, first_name, last_name }) {
    const result = await pool.query(
      'UPDATE users SET email=$1, username=$2, first_name=$3, last_name=$4 WHERE id=$5 RETURNING *',
      [email, username, first_name, last_name, id]
    );
    return result.rows[0];
  }

  static async getPasswordByUsername(username) {
    const result = await pool.query(
      'SELECT password FROM hashpwd WHERE username = $1',
      [username]
    );
    return result.rows[0]?.password;
  }
}

export default UserModel;
