import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Auth from './components/layout/Auth.jsx';
import Home from './components/layout/Home.jsx';

import UserProducts from './components/UserProducts.jsx';
import UsersProducts from './components/UsersProducts.jsx';
import NotFound from './components/layout/NotFound.jsx';
import ProtectedRoutes from './components/layout/ProtectedRoutes.jsx';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route index element={<Auth />} />
                    <Route path="home" element={<Home />}>
                        <Route path="/home" element={<UsersProducts />} />
                        <Route path="/home/:id" element={<UserProducts />} />
                    </Route>
                    {ProtectedRoutes()}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
