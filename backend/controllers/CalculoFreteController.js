const { getCep, getParametrosFrete, getDistancia, saveCalculoFrete } = require('../models/CalculoFreteModel');

const calcularFrete = (req, res) => {
  const { cepOrigem, cepDestino, peso, largura, altura, comprimento } = req.body;

  if (peso > 12) {
    return res.status(400).json({ error: 'Não é possível transportar mercadorias acima de 12Kg' });
  }

  getCep(cepOrigem, (err, resultOrigem) => {
    if (err || !resultOrigem) {
      return res.status(400).json({ error: 'CEP de origem não encontrado' });
    }

    getCep(cepDestino, (err, resultDestino) => {
      if (err || !resultDestino) {
        return res.status(400).json({ error: 'CEP de destino não encontrado' });
      }

      getDistancia(cepOrigem, cepDestino, (err, distancia) => {
        if (err || !distancia) {
          return res.status(400).json({ error: 'Distância não encontrada' });
        }

        getParametrosFrete((err, parametros) => {
          if (err || !parametros) {
            return res.status(400).json({ error: 'Parâmetros de frete não encontrados' });
          }

          let valorFrete = 0;
          if (peso < 1) {
            valorFrete = parametros.menos_1kg;
          } else if (peso >= 1 && peso < 3) {
            valorFrete = parametros.entre_1kge3kg;
          } else if (peso >= 3 && peso < 8) {
            valorFrete = parametros.entre_3kge8kg;
          } else if (peso >= 8 && peso <= 12) {
            valorFrete = parametros.entre_8kge12kg;
          }

          const custoKm = parametros.km_rodado;
          const valorTotalFrete = valorFrete + (distancia * custoKm);

          const calculo = {
            cep_origem: cepOrigem,
            cep_destino: cepDestino,
            peso: peso,
            largura: largura,
            altura: altura,
            comprimento: comprimento,
            distancia_km: distancia,
            valor_frete: valorTotalFrete
          };

          saveCalculoFrete(calculo, (err, result) => {
            if (err) {
              return res.status(500).json({ error: 'Erro ao salvar cálculo de frete' });
            }
            res.json({ valorFrete: valorTotalFrete, distancia });
          });
        });
      });
    });
  });
};

module.exports = {
  calcularFrete
};
