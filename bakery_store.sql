DROP DATABASE IF EXISTS bakery_store;
CREATE DATABASE IF NOT EXISTS bakery_store;
USE bakery_store;

-- TABLA categorías
CREATE TABLE categorias (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL
);

-- TABLA usuarios
CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  contraseña VARCHAR(255) NOT NULL,
  es_administrador TINYINT(1) NOT NULL DEFAULT 0
);

-- TABLA productos
CREATE TABLE productos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  descripción TEXT,
  imagen VARCHAR(255),
  precio DECIMAL(10,2) NOT NULL,
  id_categoria INT NOT NULL,
  FOREIGN KEY (id_categoria) REFERENCES categorias(id)
);

-- TABLA pedidos
CREATE TABLE pedidos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_usuario INT NOT NULL,
  precio_total DECIMAL(10,2) NOT NULL,
  creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- TABLA elementos_pedido
CREATE TABLE elementos_pedido (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_pedido INT NOT NULL,
  id_producto INT NOT NULL,
  cantidad INT NOT NULL,
  FOREIGN KEY (id_pedido) REFERENCES pedidos(id),
  FOREIGN KEY (id_producto) REFERENCES productos(id)
);

-- TABLA carritos
CREATE TABLE carritos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_usuario INT NOT NULL,
  precio_total DECIMAL(10,2) NOT NULL,
  creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- TABLA elementos_carrito
CREATE TABLE elementos_carrito (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_carrito INT NOT NULL,
  id_producto INT NOT NULL,
  cantidad INT NOT NULL,
  FOREIGN KEY (id_carrito) REFERENCES carritos(id),
  FOREIGN KEY (id_producto) REFERENCES productos(id)
);

-- TABLA opiniones
CREATE TABLE opiniones (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_usuario INT NOT NULL,
  id_producto INT NOT NULL,
  calificación INT NOT NULL,
  comentario TEXT,
  creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
  FOREIGN KEY (id_producto) REFERENCES productos(id)
);

-- TABLA listas_de_deseos
CREATE TABLE listas_de_deseos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_usuario INT NOT NULL,
  id_producto INT NOT NULL,
  creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
  FOREIGN KEY (id_producto) REFERENCES productos(id)  
);

-- TABLA pagos
CREATE TABLE pagos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_pedido INT NOT NULL,
  cantidad DECIMAL(10,2) NOT NULL,
  metodo_de_pago VARCHAR(50) NOT NULL,
  pagado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_pedido) REFERENCES pedidos(id)
);