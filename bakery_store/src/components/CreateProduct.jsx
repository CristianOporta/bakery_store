import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './CreateProduct.css'
import { createProducto, getCategorias } from '../api/api'; // Asegúrate de importar createProducto
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const CreateProduct = () => {
    const [producto, setProducto] = useState({
        nombre: '',
        descripción: '',
        imagen: '',
        precio: 0,
        id_categoria: 1, // Ajusta el ID de la categoría según tus necesidades
    });
    
    const [categorias, setCategorias] = useState([]); // Estado para almacenar las categorías
    const navigate = useNavigate(); // Obtiene la función de navegación

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };

    useEffect(() => {
        // Cargar las categorías cuando el componente se monte
        getCategorias()
            .then((response) => {
                setCategorias(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener categorías: ' + error);
            });
    }, []); // El arreglo de dependencias vacío asegura que se carguen las categorías una sola vez al montar el componente

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProducto(producto);
            // Redirige a la página principal después de crear un nuevo producto
            navigate('/');
            // Maneja la respuesta, por ejemplo, mostrando un mensaje de éxito o redirigiendo a la lista de productos.
        } catch (error) {
            console.error('Error al crear el producto:', error);
            // Maneja los errores según tus necesidades.
        }
    };

    return (
        <div className="d-flex justify-content-center">

            <Form onSubmit={handleSubmit}>
                <h2>Crear Nuevo Producto</h2>

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
                </Form.Group>
                <p></p>
                <Button variant="primary" type="submit">
                    Crear Producto
                </Button>
                <p></p>
            </Form>
        </div>
    );
};

export default CreateProduct;
