import axios from 'axios';

const apiUrl = 'http://localhost:5000'; // La URL de tu servidor Express

const api = axios.create({
  baseURL: apiUrl,
});

export const getProductos = () => {
  return api.get('/productos');
};

export const getCategorias = () => {
  return api.get('/categorias');
};

export const getProductosPorCategoria = (idCategoria) => {
  return api.get(`/categoria/${idCategoria}`); // Construye la URL con el parámetro idCategoria
};

export const createProducto = (nuevoProducto) => {
  return api.post('/producto/create', nuevoProducto); // Utiliza la misma ruta que definiste en el servidor
};

export const editProducto = (idProducto, productoActualizado) => {
  return api.put(`/producto/edit/${idProducto}`, productoActualizado);
};

export const getProducto = (idProducto) => {
  return api.get(`/producto/${idProducto}`);
};

export const deleteProducto = (idProducto) => {
  return api.delete(`/producto/${idProducto}`);
};

export const eliminarFoto = (fotoData) => {
  return api.post('/producto/deleteFoto', fotoData);
};