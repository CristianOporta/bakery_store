import React, { useState, useEffect } from 'react';
import { getProductos } from '../api/api';
import ProductCard from './ProductCard';
import './ProductList.css';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
            try {
                getProductos().then((response) => {
                    setProductos(response.data);
                }).catch((error) => {
                    console.error('Error al obtener productos: ' + error);
                });
                
            } catch (error) {
                console.log("Hola el error fue :D :", error)
            }


    }, []);

    return (
        <div className="container">
            <Link to="/producto/create">
                <button type='button' className='btn btn-primary btnCrear'>Crear</button> <p></p>
            </Link>
            <div className="row">
                {
                    productos.map((producto, index) => (
                        <div key={
                            index
                        }
                            className="col-4">
                            <ProductCard producto={producto}  />
                        </div>

                    ))
                } </div>
        </div>


    );
};

export default ProductList;
