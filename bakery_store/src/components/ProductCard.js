import React from 'react';


const ProductCard = ({producto}) => {

    const imageStyle = {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'cover'
    };

    return (
        <div className="product-card card rounded shadow-sm bg-white mt-4 mb-4">
            <img src={
                    producto.imagen
                }
                alt={
                    producto.nombre
                }
                style={imageStyle}/>
            <div className='p-3'>
                <h3>{
                    producto.nombre
                }</h3>
                <p>{
                    producto.descripción
                }</p>
                <p>Precio: ${
                    producto.precio
                }</p>
            </div>

        </div>
    );
};

export default ProductCard;
