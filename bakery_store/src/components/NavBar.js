import React, {useState} from 'react';
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

function NavBar() {
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleCloseOffcanvas = () => setShowOffcanvas(false);
    const handleShowOffcanvas = () => setShowOffcanvas(true);

    return (
        <Container fluid>
            <Navbar bg="light"
                expand={false}>
                <Navbar.Brand href="#">
                    <img src="https://i.imgur.com/BlyxxN9.png" width="40" height="30" className="d-inline-block align-top " alt="Logo"/> Bakery Store</Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" aria-label="Toggle navigation"
                    onClick={handleShowOffcanvas}/>
            </Navbar>
            <Offcanvas show={showOffcanvas}
                onHide={handleCloseOffcanvas}
                placement="end"
                aria-labelledby="offcanvasNavbarLabel">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title h5 id="offcanvasNavbarLabel">Contenido</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3 navbar-nav">
                        <Nav.Link href="#action1">Carrito</Nav.Link>
                        <Nav.Link href="#action2">Lista de deseos</Nav.Link>
                        <NavDropdown title="Productos" id="offcanvasNavbarDropdown">
                            <NavDropdown.Item href="#action3">Caros</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Económicos</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action5">Inicio</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <FormControl type="search" placeholder="Search" aria-label="Search" className="me-2"/>
                        <Button variant="outline-success">Buscar</Button>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </Container>
    );
}

export default NavBar;
