if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');

const app = express(); //servidor
require('./database');

// Configurando el servidor..
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev')); // Middleware para capturar solicitudes HTTP

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename(req, file, callback) {
    callback(null, new Date().getTime() + path.extname(file.originalname)); // Las imagenes que se suban sera en el formato: 12312315443.jpg (el jpg depende de la extension del arch)
  },
});

app.use(multer({ storage }).single('image')); // Middleware para maniputar mas facil multipart/form-data cuando los usuarios suben archivos.
app.use(express.urlencoded({ extended: false })); // Interpretar los datos como un JSON (PUT - POST)
app.use(express.json());

// Routes
app.use('/api/books', require('./routes/books'));

// Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// Empezar con el servidor..
app.listen(app.get('port'), () => {
  console.log('Server on port: ', app.get('port'));
});
