const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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

// Configura Multer para gestionar las cargas de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/'); // Guarda las imágenes en la carpeta 'uploads'
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

app.use(express.static('uploads')); // Sirve archivos estáticos desde la carpeta 'uploads'

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


// Ruta para cargar una imagen
app.post('/producto/create', upload.single('imagen'), (req, res) => {
    const nuevoProducto = req.body; // Los demás datos del producto se envían en el cuerpo de la solicitud
    const imagenPath = req.file.filename; // Ruta de la imagen cargada

    const sql = 'INSERT INTO productos (nombre, descripción, imagen, precio, id_categoria) VALUES (?, ?, ?, ?, ?)';
    const values = [nuevoProducto.nombre, nuevoProducto.descripcion, imagenPath, nuevoProducto.precio, nuevoProducto.id_categoria];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al crear el producto: ' + err.message);
            res.status(500).json({ error: 'Error en la base de datos' });
        } else {
            res.json({ message: 'Producto creado exitosamente' });
        }
    });
});


app.put('/producto/edit/:idProducto', upload.single('imagen'), (req, res) => {
    const { idProducto } = req.params;
    const updatedProducto = req.body;
    const imagenPath = req.file ? req.file.filename : null; // Maneja la imagen solo si se proporciona

    const sql = 'UPDATE productos SET nombre = ?, descripción = ?, imagen = ?, precio = ?, id_categoria = ? WHERE id = ?';
    const values = [
        updatedProducto.nombre,
        updatedProducto.descripcion,
        imagenPath, // Usa la nueva imagenPath o la existente
        updatedProducto.precio,
        updatedProducto.id_categoria,
        idProducto,
    ];

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

    // Consulta la base de datos para obtener la ruta de la imagen asociada al producto
    const sqlSelectImage = 'SELECT imagen FROM productos WHERE id = ?';
    db.query(sqlSelectImage, [idProducto], (err, result) => {
        if (err) {
            console.error('Error al obtener la ruta de la imagen: ' + err.message);
            res.status(500).json({ error: 'Error en la base de datos' });
        } else {
            if (result.length > 0) {
                const imagenPath = result[0].imagen;

                // Elimina el producto de la base de datos
                const sqlDeleteProduct = 'DELETE FROM productos WHERE id = ?';
                db.query(sqlDeleteProduct, [idProducto], (err, result) => {
                    if (err) {
                        console.error('Error al eliminar el producto: ' + err.message);
                        res.status(500).json({ error: 'Error en la base de datos' });
                    } else {
                        // Elimina el archivo de la imagen de la carpeta 'uploads'
                        const imagePath = path.join(__dirname + "\\uploads", imagenPath);
                        fs.unlink(imagePath, (err) => {
                            if (err) {
                                console.error('Error al eliminar la imagen: ' + err.message);
                            }
                        });

                        res.json({ message: 'Producto eliminado exitosamente' });
                    }
                });
            } else {
                res.status(404).json({ error: 'Producto no encontrado' });
            }
        }
    });
});

app.post('/producto/deleteFoto', (req, res) => {
    const { fotoPath } = req.body;

    // Elimina la foto de la carpeta 'uploads'
    const imagePath = path.join(__dirname + "\\uploads", fotoPath);
    fs.unlink(imagePath, (err) => {
        if (err) {
            console.error('Error al eliminar la imagen: ' + err.message);
            res.status(500).json({ error: 'Error al eliminar la imagen' });
        } else {
            res.json({ message: 'Imagen eliminada exitosamente' });
        }
    });
});



app.listen(port, () => {
    console.log(`Servidor Express está corriendo en el puerto ${port}`);
});




