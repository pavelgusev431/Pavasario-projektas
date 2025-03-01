import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Auth from './components/layout/Auth.jsx';
import Home from './components/layout/Home.jsx';
import NotFound from './components/layout/NotFound.jsx';
import ProtectedRoutes from './components/layout/ProtectedRoutes.jsx';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route index element={<Auth authType="login" />} />
                    <Route path="home" element={<Home />} />
                    <Route path="signup" element={<Auth />} />
                    {ProtectedRoutes()}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
