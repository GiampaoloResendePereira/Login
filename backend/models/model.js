const db = require('../db');

const insertName = (name, callback) => {
  const sql = 'INSERT INTO names (name) VALUES (?)';
  db.query(sql, [name], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

module.exports = {
  insertName,
};
