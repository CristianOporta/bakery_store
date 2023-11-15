import React, { useEffect, useState } from 'react';
import { Form, Button,  } from 'react-bootstrap';
import { createProducto, getCategorias } from '../api/api';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    const [producto, setProducto] = useState({
        nombre: '',
        descripción: '',
        imagen: null, // Cambiamos a null para manejar archivos
        precio: 0,
        id_categoria: 1,
    });

    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        console.log(value);
        setProducto({ ...producto, [name]: type === 'file' ? e.target.files[0] : value });
    };

    useEffect(() => {
        getCategorias()
            .then((response) => {
                setCategorias(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener categorías: ' + error);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('nombre', producto.nombre);
            formData.append('descripcion', producto.descripción);
            
            formData.append('imagen', producto.imagen); // Agregamos la imagen al formData
            formData.append('precio', producto.precio);
            formData.append('id_categoria', producto.id_categoria);

            
            await createProducto(formData); // Enviamos el formData en lugar del objeto directamente
            navigate('/');
        } catch (error) {
            console.error('Error al crear el producto:', error);
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
                    <Form.Label>Imagen:</Form.Label>
                    <Form.Control type="file" name="imagen" accept="image/*" onChange={handleChange} required/>
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

