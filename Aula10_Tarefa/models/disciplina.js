const mongoose = require("mongoose");

const Disciplina = mongoose.model("Disciplina", {
    nome: String,
    cargaHoraria: Number,
    sala: String,
});

module.exports = Disciplina;