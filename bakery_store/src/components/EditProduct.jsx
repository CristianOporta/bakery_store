import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { editProducto, getCategorias, getProducto, eliminarFoto } from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
    const { idProducto } = useParams();
    const [producto, setProducto] = useState({
        nombre: '',
        descripción: '',
        imagen: null,
        precio: 0,
        id_categoria: 1,
    });

    const [categorias, setCategorias] = useState([]);
    const [fotoAnterior, setFotoAnterior] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setProducto({ ...producto, [name]: type === 'file' ? e.target.files[0] : value });
    };

    const eliminarFotoAnterior = async (fotoAnteriorPath) => {
        try {
            await eliminarFoto({ fotoPath: fotoAnteriorPath });
            // Manejar la respuesta del servidor si es necesario
        } catch (error) {
            console.error('Error al eliminar la foto anterior:', error);
            // Manejar errores
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('nombre', producto.nombre);
            formData.append('descripcion', producto.descripción);
            formData.append('imagen', producto.imagen);
            formData.append('precio', producto.precio);
            formData.append('id_categoria', producto.id_categoria);

            // Si hay una nueva foto y la foto anterior existe, elimina la foto anterior
            if (producto.imagen && fotoAnterior) {
                await eliminarFotoAnterior(fotoAnterior);
            }

            await editProducto(idProducto, formData);
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
                    setFotoAnterior(productoAEditar.imagen || ''); // Almacena la foto anterior (puede ser null)
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
                    <Form.Label>Imagen:</Form.Label>
                    <Form.Control type="file" name="imagen" accept="image/*" onChange={handleChange} defaultValue={producto.imagen} required/>
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
            </Form>
        </div>
    );
};

export default EditProduct;
