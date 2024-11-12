const mongoose = require('mongoose');

const Exame = mongoose.model('Exame', {
    nome: String,
    clinica: String,
    id_cliente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    },
  
});

module.exports = Exame;
