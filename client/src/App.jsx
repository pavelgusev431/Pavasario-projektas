import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Auth from './components/layout/Auth.jsx';
import Home from './components/layout/Home.jsx';
import NotFound from './components/layout/NotFound.jsx';
import ProtectedRoutes from './components/layout/ProtectedRoutes.jsx';
import UserProducts from './components/UserProducts.jsx';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route index element={<Auth />} />
                    <Route path="home" element={<Home />} />
                    {ProtectedRoutes()}
                    <Route path='/products/:id' element={<UserProducts />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
