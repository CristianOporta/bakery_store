import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

const Footer = () => { // Estilo para las etiquetas "a"
    const linkStyle = {
        textDecoration: 'none', // Aplicar text-decoration: none
    };

    return (
        <footer className="bg-dark text-white py-4">
            <Container>
                <Row>
                    <Col md={6}>
                        <h5 className="mb-3">Información de contacto</h5>
                        <p>
                            <strong>Dirección: </strong>
                            Frente a la Facultad de Ciencias de Humanidades, UNAN, León</p>
                        <p>
                            <strong>Email: </strong>
                            crisoporta2002@gmail.com</p>
                        <p>
                            <strong>Teléfono: </strong>
                            (505) 5764-4568</p>
                    </Col>
                    <Col md={6}>
                        <h5 className="mb-3">Enlaces útiles</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="/"
                                    style={linkStyle}>Inicio</a>
                            </li>
                            <li>
                                <a href="/about"
                                    style={linkStyle}>Acerca de</a>
                            </li>
                            <li>
                                <a href="/contact"
                                    style={linkStyle}>Contacto</a>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
            <div className="bg-dark text-center py-2">
                <small>&copy; 2023 Bakery Store. Todos los derechos reservados.</small>
            </div>
        </footer>
    );
};

export default Footer;
