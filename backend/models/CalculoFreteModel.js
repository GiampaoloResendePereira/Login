const db = require('../db');

const verificarCep = (cep, callback) => {
  const sql = 'SELECT * FROM cep WHERE cep = ?';
  db.query(sql, [cep], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results.length > 0);
  });
};

const obterDistancia = (cepOrigem, cepDestino, callback) => {
  const sql = 'SELECT distancia_km, tempo_deslocamento_min FROM distancias_cep WHERE cep_origem = ? AND cep_destino = ?';
  db.query(sql, [cepOrigem, cepDestino], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    if (results.length > 0) {
      return callback(null, results[0]);
    } else {
      return callback(new Error('Distância não encontrada'), null);
    }
  });
};

const obterParametrosFrete = (callback) => {
  const sql = 'SELECT * FROM parametro_frete LIMIT 1';
  db.query(sql, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    if (results.length > 0) {
      return callback(null, results[0]);
    } else {
      return callback(new Error('Parâmetros de frete não encontrados'), null);
    }
  });
};

module.exports = {
  verificarCep,
  obterDistancia,
  obterParametrosFrete
};
