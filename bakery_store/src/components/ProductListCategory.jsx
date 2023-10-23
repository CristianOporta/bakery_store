import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductosPorCategoria } from '../api/api';
import ProductCard from './ProductCard';

const ProductListCategory = () => {
    const { nombreCategoria } = useParams();
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        getProductosPorCategoria(nombreCategoria)
            .then((response) => {
                setProductos(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener productos: ' + error);
            });
    }, [nombreCategoria]);

    return (
        <div className="container">
            <h1>Categoría: {nombreCategoria}</h1> <p></p>
            <div className="row">
                {productos.map((producto, index) => (
                    <div key={producto.id} className="col-4">
                        <ProductCard producto={producto} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductListCategory;

