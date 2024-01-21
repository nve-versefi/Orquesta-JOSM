const mongoose = require('mongoose');

const integranteSchema = new mongoose.Schema({
  Nombre: String,
  Cargo: String,
  Linea: String,
  Descripcion: String,
  RedesSociales: String,
  SitioWeb: String,
  CanalYoutube: String
});

const Integrante = mongoose.model('Integrante', integranteSchema);

module.exports = Integrante;
