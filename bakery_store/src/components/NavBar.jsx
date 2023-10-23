import React, { useEffect, useState } from 'react';
import { getCategorias } from '../api/api';
import {
    Container,
    Navbar,
    Nav,
    NavDropdown,
    Form,
    FormControl,
    Button,
    Offcanvas
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavBar() {
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleCloseOffcanvas = () => setShowOffcanvas(false);
    const handleShowOffcanvas = () => setShowOffcanvas(true);



    const [categorias, setCategorias] = useState([]);


    const componentStyle = {
        background: 'rgb(248, 249, 251)', // Cambia el color de fondo según tu preferencia
    };

    useEffect(() => {
        getCategorias().then((response) => {
            setCategorias(response.data);
        }).catch((error) => {
            console.error('Error al obtener productos: ' + error);
        });
    }, []);


    return (
        <div className="bg-white">
            <Container fluid className='mb-3'
                style={componentStyle}>
                <Navbar bg="light"
                    expand={false}>
                    <Link to="/" className="nav-link">
                        <Navbar.Brand href="#">
                            <img src="https://i.imgur.com/BlyxxN9.png" width="40" height="30" className="d-inline-block align-top" alt="Logo" />
                            {" "} Bakery Store</Navbar.Brand></Link>
                    <Navbar.Toggle aria-controls="offcanvasNavbar" aria-label="Toggle navigation"
                        onClick={handleShowOffcanvas} />
                </Navbar>
                <Offcanvas show={showOffcanvas}
                    onHide={handleCloseOffcanvas}
                    placement="end"
                    aria-labelledby="offcanvasNavbarLabel">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title h5 id="offcanvasNavbarLabel">Contenido</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Form className="d-flex">
                            <FormControl type="search" placeholder="Search" aria-label="Search" className="me-2" />
                            <Button variant="outline-success">Buscar</Button>
                        </Form>
                        <Nav className="justify-content-end flex-grow-1 pe-3 navbar-nav">
                            <Nav.Link href="#action1">Carrito</Nav.Link>
                            <Nav.Link href="#action2">Lista de deseos</Nav.Link>
                            <NavDropdown title="Categorías" id="offcanvasNavbarDropdown">
                                {categorias.map((categoria, index) => (
                                    <div key={categoria.id}>
                                        <Link to={`/categoria/${categoria.nombre}`} className="nav-link p-2">
                                            {categoria.nombre}
                                        </Link>
                                    </div>
                                ))}
                                <NavDropdown.Divider />
                                <Link to="/" className="nav-link p-2">Todos</Link>
                            </NavDropdown>
                        </Nav>

                    </Offcanvas.Body>
                </Offcanvas>
            </Container>
        </div>
    );
}

export default NavBar;