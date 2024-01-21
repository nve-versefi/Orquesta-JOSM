const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const mailer = require('./mailer');
const path = require('path'); 


const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://127.0.0.1:27017/integrantes-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Error de conexión a MongoDB:', error);
});

db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'www.orquestajosm.com'); //Era localhost:4200
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/', routes);

// Mailer
app.use('/', mailer);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/galeria', express.static(path.join(__dirname, 'galeria')));

app.listen(PORT, () => {
  console.log(`Servidor en www.orquestajosm.com:${PORT}`); //Used to be localhost:3000
});