-- Insertar algunas categorías de productos
INSERT INTO categorias (nombre) VALUES
('Tartas'),
('Cupcakes'),
('Galletas'),
('Pan'),
('Pasteles de boda'),
('Postres sin gluten');

-- Insertar usuarios (puedes agregar más usuarios)
INSERT INTO usuarios (nombre, email, contraseña, es_administrador) VALUES
('Admin', 'admin@pasteleria.com', 'contraseña_admin', 1),
('Usuario1', 'usuario1@pasteleria.com', 'contraseña1', 0),
('Usuario2', 'usuario2@pasteleria.com', 'contraseña2', 0);

-- Insertar productos (puedes agregar más productos)
INSERT INTO productos (nombre, descripción, imagen, precio, id_categoria) VALUES
('Tarta de Fresa', 'Una deliciosa tarta de fresa con crema batida.', '2699423262290-235003827.png', 20.99, 1),
('Cupcake de Chocolate', 'Un tierno cupcake de chocolate con frosting.', '7124685021359-941278563.png', 3.99, 2),
('Galletas de Avena', 'Galletas crujientes de avena con pasas.', '3987562147092-562831947.png', 4.99, 3),
('Pan de Centeno', 'Pan integral de centeno recién horneado.', '5293476102856-149783265.png', 2.49, 4),
('Pastel de Bodas Clásico', 'Un pastel elegante para tu día especial.', '8462097315743-325698471.png', 99.99, 5),
('Pastel de Chocolate Sin Gluten', 'Un pastel sin gluten para los que tienen restricciones alimenticias.', '2134758960428-987365214.png', 29.99, 6);

-- Insertar algunos pedidos
INSERT INTO pedidos (id_usuario, precio_total) VALUES
(2, 24.97),
(3, 37.98),
(2, 54.95);

-- Insertar elementos de pedido
INSERT INTO elementos_pedido (id_pedido, id_producto, cantidad) VALUES
(1, 1, 1),
(2, 3, 2),
(3, 6, 1);

-- Insertar carritos (puedes agregar más carritos)
INSERT INTO carritos (id_usuario, precio_total) VALUES
(2, 15.98),
(3, 19.97);

-- Insertar elementos de carrito
INSERT INTO elementos_carrito (id_carrito, id_producto, cantidad) VALUES
(1, 2, 3),
(2, 4, 2),
(2, 5, 1);

-- Insertar opiniones de productos
INSERT INTO opiniones (id_usuario, id_producto, calificación, comentario) VALUES
(2, 1, 5, 'Me encanta esta tarta de fresa.'),
(3, 3, 4, 'Las galletas de avena son deliciosas.'),
(2, 6, 5, 'El pastel sin gluten es una bendición.');

-- Insertar listas de deseos
INSERT INTO listas_de_deseos (id_usuario, id_producto) VALUES
(2, 2),
(3, 4),
(3, 6);

-- Insertar pagos
INSERT INTO pagos (id_pedido, cantidad, metodo_de_pago) VALUES
(1, 24.97, 'Tarjeta de crédito'),
(2, 37.98, 'PayPal'),
(3, 54.95, 'Tarjeta de débito');
