import { Routes, Route } from 'react-router-dom';
import Auth from './components/layout/Auth.jsx';
import Home from './components/layout/Home.jsx';
import Contact from './components/layout/Contact.jsx';
import About from './components/layout/About.jsx';
import NotFound from './components/layout/NotFound.jsx';
import NavBar from './components/layout/NavBar.jsx';

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route index element={<Auth />} />
                <Route path="home" element={<Home />} />
                <Route path="contact" element={<Contact />} />
                <Route path="about" element={<About />} />
                <Route path="signup" element={<Auth authType="signup" />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
