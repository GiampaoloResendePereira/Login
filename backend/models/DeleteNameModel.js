const db = require('../db');

const deleteName = (id, callback) => {
  const sql = 'DELETE FROM names WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

module.exports = {
  deleteName
};
