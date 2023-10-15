const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Configura la conexión a la base de datos MySQL
const db = mysql.createConnection({host: 'localhost', port: 3307, user: 'root', password: 'CrisJOC&260802', database: 'bakery_store'});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos: ' + err.message);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

// Define rutas y controladores para tu aplicación Express
app.get('/', (req, res) => {
    return res.json("From Backend Side")
});

app.get('/productos', (req, res) => {
  const sql = 'SELECT * FROM productos';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error en la consulta: ' + err.message);
      res.status(500).json({ error: 'Error en la base de datos' });
    } else {
      res.json(result);
    }
  });
});

app.listen(port, () => {
    console.log(`Servidor Express está corriendo en el puerto ${port}`);
});
