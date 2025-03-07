import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Auth from './components/layout/Auth.jsx';
import Home from './components/layout/Home.jsx';
import Contact from './components/layout/Contact.jsx';
import About from './components/layout/About.jsx';
import NotFound from './components/layout/NotFound.jsx';
import NavBar from './components/layout/NavBar.jsx';
import UsersProducts from './components/UsersProducts.jsx';
import UserProducts from './components/UserProducts.jsx';
import PasswordReset from './components/layout/PasswordReset.jsx';
function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route index element={<Auth />} />
                <Route path="home" element={<Home />}>
                    <Route path="/home" element={<UsersProducts />} />
                    <Route path="/home/:id" element={<UserProducts />} />
                </Route>
                <Route path="contact" element={<Contact />} />
                <Route path="about" element={<About />} />
                <Route path="signup" element={<Auth authType="signup" />} />
                <Route path="reset/:userid/:salt" element={<PasswordReset />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
