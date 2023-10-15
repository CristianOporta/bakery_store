import axios from 'axios';

const apiUrl = 'http://localhost:5000'; // La URL de tu servidor Express

const api = axios.create({
  baseURL: apiUrl,
});

export const getProductos = () => {
  return api.get('/productos');
};

export const postProductos = (datos) => {
  return api.post('/productos', datos);
};
