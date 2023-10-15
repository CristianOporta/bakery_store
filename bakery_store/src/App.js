import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    return (
        <div>
            <NavBar/>
            <ProductList/>
            <Footer/>
        </div>
    );
}

export default App;
