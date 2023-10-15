import React, {useState, useEffect} from 'react';
import { getProductos } from '../api/api';
import ProductCard from './ProductCard';

const ProductList = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        getProductos().then((response) => {
            setProductos(response.data);
        }).catch((error) => {
            console.error('Error al obtener productos: ' + error);
        });
    }, []);

    return (
        <div className="container">
            <div className="row">
                {
                productos.map((producto, index) => (
                    <div key={
                            producto.id
                        }
                        className="col-4">
                        <ProductCard producto={producto}/>
                    </div>
                    
                ))
            } </div>
        </div>

        
    );
};

export default ProductList;
