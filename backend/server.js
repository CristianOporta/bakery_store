const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Configura la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'CrisJOC&260802',
    database: 'bakery_store'
});

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

app.get('/categorias', (req, res) => {
    const sql = 'SELECT * FROM categorias';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error en la consulta: ' + err.message);
            res.status(500).json({ error: 'Error en la base de datos' });
        } else {
            res.json(result);
        }
    });
});


app.get('/categoria/:nombreCategoria', (req, res) => {
    const { nombreCategoria } = req.params;
    const sql = 'SELECT productos.* FROM productos INNER JOIN categorias ON productos.id_categoria = categorias.id WHERE categorias.nombre = ?';
    db.query(sql, [nombreCategoria], (err, result) => {
        if (err) {
            console.error('Error en la consulta: ' + err.message);
            res.status(500).json({ error: 'Error en la base de datos' });
        } else {
            res.json(result);
        }
    });
});


app.post('/producto/create', (req, res) => {
    const nuevoProducto = req.body; // El nuevo producto se debe enviar en el cuerpo de la solicitud
    const sql = 'INSERT INTO productos (nombre, descripción, imagen, precio, id_categoria) VALUES (?, ?, ?, ?, ?)';
    const values = [nuevoProducto.nombre, nuevoProducto.descripción, nuevoProducto.imagen, nuevoProducto.precio, nuevoProducto.id_categoria];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al crear el producto: ' + err.message);
            res.status(500).json({ error: 'Error en la base de datos' });
        } else {
            res.json({ message: 'Producto creado exitosamente' });
        }
    });
});


app.put('/producto/edit/:idProducto', (req, res) => {
    const { idProducto } = req.params;
    const updatedProducto = req.body; // Los datos actualizados del producto se deben enviar en el cuerpo de la solicitud
    const sql = 'UPDATE productos SET nombre = ?, descripción = ?, imagen = ?, precio = ?, id_categoria = ? WHERE id = ?';
    const values = [updatedProducto.nombre, updatedProducto.descripción, updatedProducto.imagen, updatedProducto.precio, updatedProducto.id_categoria, idProducto];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al editar el producto: ' + err.message);
            res.status(500).json({ error: 'Error en la base de datos' });
        } else {
            res.json({ message: 'Producto editado exitosamente' });
        }
    });
});



// Agrega la ruta para obtener los detalles de un producto por su ID
app.get('/producto/:idProducto', (req, res) => {
    const { idProducto } = req.params;
    const sql = 'SELECT * FROM productos WHERE id = ?';
    db.query(sql, [idProducto], (err, result) => {
        if (err) {
            console.error('Error al obtener el producto: ' + err.message);
            res.status(500).json({ error: 'Error en la base de datos' });
        } else {
            if (result.length > 0) {
                res.json(result[0]); // Envía los detalles del producto
            } else {
                res.status(404).json({ error: 'Producto no encontrado' });
            }
        }
    });
});



app.delete('/producto/:idProducto', (req, res) => {
    const { idProducto } = req.params;
    const sql = 'DELETE FROM productos WHERE id = ?';
    db.query(sql, [idProducto], (err, result) => {
        if (err) {
            console.error('Error al eliminar el producto: ' + err.message);
            res.status(500).json({ error: 'Error en la base de datos' });
        } else {
            res.json({ message: 'Producto eliminado exitosamente' });
        }
    });
});


app.listen(port, () => {
    console.log(`Servidor Express está corriendo en el puerto ${port}`);
});




