import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { editProducto, getCategorias, getProducto } from '../api/api'; // Asegúrate de importar las funciones necesarias de tu archivo api.js
import { useParams, useNavigate } from 'react-router-dom'; // Importa useParams y useNavigate

const EditProduct = () => {
    const { idProducto } = useParams(); // Obtiene el idProducto de la URL
    const [producto, setProducto] = useState({
        nombre: '',
        descripción: '',
        imagen: '',
        precio: 0,
        id_categoria: 1,
    });

    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate(); // Obtiene la función de navegación

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await editProducto(idProducto, producto);
            // Redirige a la lista de productos o a donde desees después de editar el producto
            navigate('/');
        } catch (error) {
            console.error('Error al editar el producto:', error);
        }
    };

    useEffect(() => {
        getCategorias()
            .then((response) => {
                setCategorias(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener categorías: ' + error);
            });

        // Obtén los datos del producto para editar
        getProducto(idProducto)
            .then((response) => {
                const productoAEditar = response.data;
                if (productoAEditar) {
                    setProducto(productoAEditar);
                }
            })
            .catch((error) => {
                console.error('Error al obtener el producto para editar: ' + error);
            });
    }, [idProducto]);

    return (
        <div className="d-flex justify-content-center">

            <Form onSubmit={handleSubmit}>
                <h2>Editar Producto Seleccionado</h2>
                <Form.Group controlId="nombre">
                    <Form.Label>Nombre:</Form.Label>
                    <Form.Control type="text" name="nombre" value={producto.nombre} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="descripción">
                    <Form.Label>Descripción:</Form.Label>
                    <Form.Control as="textarea" rows={3} name="descripción" value={producto.descripción} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="imagen">
                    <Form.Label>Imagen URL:</Form.Label>
                    <Form.Control type="text" name="imagen" value={producto.imagen} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="precio">
                    <Form.Label>Precio:</Form.Label>
                    <Form.Control type="number" name="precio" value={producto.precio} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="id_categoria">
                    <Form.Label>Categoría:</Form.Label>
                    <Form.Control as="select" name="id_categoria" value={producto.id_categoria} onChange={handleChange}>
                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.nombre}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group> <p></p>
                <Button variant="primary" type="submit">
                    Guardar Cambios
                </Button>
                <p></p>

            </Form>
        </div>
    );
};

export default EditProduct;
