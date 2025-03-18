import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Auth from './components/layout/Register_Login/Auth.jsx';
import Home from './components/layout/Home.jsx';
import Contact from './components/layout/Contact.jsx';
import About from './components/layout/About.jsx';
import NotFound from './components/layout/NotFound.jsx';
import PasswordReset from './components/layout/Register_Login/PasswordReset.jsx';
import ProductList from './components/ProductList.jsx';
function App() {
    return (
        <Router>
            {/* <NavBar /> */}
            <Routes>
                <Route index element={<Auth />} />
                <Route path="home" element={<Home />}/>
                    
               
                <Route path="contact" element={<Contact />} />
                <Route path="about" element={<About />} />
                <Route path="signup" element={<Auth authType="signup" />} />
                <Route path="reset/:userid/:salt" element={<PasswordReset />} />
                <Route path="products" element={<ProductList />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
