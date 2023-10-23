import NavBar from './components/NavBar';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';

function App() {

    const appStyle = {
        background: 'linear-gradient(40deg, rgb(244, 251, 206), #cee4ff)', // Cambia el color de fondo según tu preferencia
    };


    return (
        <div style={appStyle}>
            <NavBar />

            <Outlet />
            
            <Footer />
        </div>
    );
}

export default App;
