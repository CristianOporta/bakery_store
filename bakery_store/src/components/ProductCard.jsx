import React from 'react';
import { Link } from 'react-router-dom'; // Importa useNavigate
import { Button } from 'react-bootstrap'; // Asegúrate de importar Button
import { deleteProducto } from '../api/api'; // Asegúrate de importar la función deleteProducto

const ProductCard = ({ producto }) => {
    const imageStyle = {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'cover'
    };
    const handleDelete = async () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            try {
                await deleteProducto(producto.id); // Usamos producto.id para obtener el ID del producto
                // Puedes redirigir a la lista de productos u otra ubicación después de eliminar el producto
                // Agrega el código de redirección aquí
                // Recarga la ruta actual ("/") después de eliminar el producto
                window.location.reload();
            } catch (error) {
                console.error('Error al eliminar el producto:', error);
            }
        }
    };

    return (
        <div className="product-card card rounded shadow-sm bg-white mb-4">
            <img
                src={producto.imagen}
                alt={producto.nombre}
                style={imageStyle}
            />
            <div className='p-3'>
                <h4>{producto.nombre}</h4>
                <p>{producto.descripción}</p>
                <p>Precio: ${producto.precio}</p>
                <Link to={`/producto/edit/${producto.id}`}>
                    <button type='button' className='btn btn-primary btnEditar'>Editar</button>
                </Link>
                {"  "}
                <Link to="/inicio">
                    <Button variant="danger" onClick={handleDelete} className='btnEliminar'>
                        Eliminar
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
