import {Route, Routes} from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import {Navbar} from 'components';
import {ShoppingCartProvider} from 'context/ShoppingCartContext';
import {Home, Store, About} from 'pages';

function App() {
    return (
        <ShoppingCartProvider>
            <Navbar />
            <Container className="mb-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </Container>
        </ShoppingCartProvider>
    );
}

export default App;
