const db = require('../db');

const getCep = (cep, callback) => {
  const sql = 'SELECT * FROM cep WHERE cep = ?';
  db.query(sql, [cep], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    if (results.length > 0) {
      return callback(null, results[0]);
    } else {
      return callback(new Error('CEP não encontrado'), null);
    }
  });
};

const getParametrosFrete = (callback) => {
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

const getDistancia = (cepOrigem, cepDestino, callback) => {
  const sql = 'SELECT distancia_km FROM distancias_cep WHERE cep_origem = ? AND cep_destino = ?';
  db.query(sql, [cepOrigem, cepDestino], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    if (results.length > 0) {
      return callback(null, results[0].distancia_km);
    } else {
      return callback(new Error('Distância não encontrada'), null);
    }
  });
};

const saveCalculoFrete = (calculo, callback) => {
  const sql = 'INSERT INTO calculos_frete (cep_origem, cep_destino, peso, largura, altura, comprimento, distancia_km, valor_frete) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [calculo.cep_origem, calculo.cep_destino, calculo.peso, calculo.largura, calculo.altura, calculo.comprimento, calculo.distancia_km, calculo.valor_frete], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
};

module.exports = {
  getCep,
  getParametrosFrete,
  getDistancia,
  saveCalculoFrete
};
