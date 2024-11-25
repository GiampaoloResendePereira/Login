const db = require('../db');

const updateName = (id, name, callback) => {
  const sql = 'UPDATE names SET name = ? WHERE id = ?';
  db.query(sql, [name, id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

module.exports = {
  updateName
};
