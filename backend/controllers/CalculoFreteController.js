const { verificarCep, obterDistancia, obterParametrosFrete } = require('../models/CalculoFreteModel');

const calcularFrete = (req, res) => {
  const { cepOrigem, cepDestino, peso, largura, altura, comprimento } = req.body;

  console.log('Dados recebidos:', { cepOrigem, cepDestino, peso, largura, altura, comprimento });

  if (peso > 12) {
    console.log('Erro: Peso acima de 12Kg');
    return res.status(400).json({ error: 'Não é possível transportar mercadorias acima de 12Kg' });
  }

  verificarCep(cepOrigem, (err, cepOrigemExiste) => {
    if (err) {
      console.error('Erro ao verificar CEP de origem:', err);
      return res.status(500).json({ error: 'Erro ao verificar CEP de origem' });
    }
    if (!cepOrigemExiste) {
      console.log('Erro: CEP de origem não encontrado');
      return res.status(400).json({ error: 'CEP de origem não encontrado' });
    }

    verificarCep(cepDestino, (err, cepDestinoExiste) => {
      if (err) {
        console.error('Erro ao verificar CEP de destino:', err);
        return res.status(500).json({ error: 'Erro ao verificar CEP de destino' });
      }
      if (!cepDestinoExiste) {
        console.log('Erro: CEP de destino não encontrado');
        return res.status(400).json({ error: 'CEP de destino não encontrado' });
      }

      obterDistancia(cepOrigem, cepDestino, (err, result) => {
        if (err) {
          console.error('Erro ao obter distância:', err);
          return res.status(500).json({ error: 'Erro ao obter distância' });
        }
        if (!result) {
          console.log('Erro: Distância não encontrada');
          return res.status(400).json({ error: 'Distância não encontrada' });
        }

        const distancia = parseFloat(result.distancia_km);
        const tempoDeslocamento = parseFloat(result.tempo_deslocamento_min);

        obterParametrosFrete((err, parametros) => {
          if (err) {
            console.error('Erro ao obter parâmetros de frete:', err);
            return res.status(500).json({ error: 'Erro ao obter parâmetros de frete' });
          }
          if (!parametros) {
            console.log('Erro: Parâmetros de frete não encontrados');
            return res.status(400).json({ error: 'Parâmetros de frete não encontrados' });
          }

          console.log('Parâmetros de frete:', parametros);

          let valorFrete = 0;
          if (peso < 1) {
            valorFrete = parseFloat(parametros.menos_1kg);
          } else if (peso >= 1 && peso < 3) {
            valorFrete = parseFloat(parametros.entre_1kge3kg);
          } else if (peso >= 3 && peso < 8) {
            valorFrete = parseFloat(parametros.entre_3kge8kg);
          } else if (peso >= 8 && peso <= 12) {
            valorFrete = parseFloat(parametros.entre_8kge12kg);
          }

          const custoKm = parseFloat(parametros.km_rodado);
          const custoDeslocamento = tempoDeslocamento * 0.30;

          const valorTotalFrete = parseFloat((valorFrete + (distancia * custoKm) + custoDeslocamento).toFixed(2));

          console.log('Valor Total do Frete:', valorTotalFrete);

          res.json({ valorFrete: valorTotalFrete, distancia, tempoDeslocamento });
        });
      });
    });
  });
};

module.exports = {
  calcularFrete
};
