import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/layout/Auth.jsx';
import Home from './components/layout/Home.jsx';
import Contact from './components/layout/Contact.jsx';
import About from './components/layout/About.jsx';
import NotFound from './components/layout/NotFound.jsx';
import NavBar from './components/layout/Navbar.jsx';
import UserProducts from './components/UserProducts.jsx';
import UsersProducts from './components/UsersProducts.jsx';
import ProtectedRoutes from './components/protected/ProtectedRoutes.jsx';
import ProfileEdit from './components/protected/ProfileEdit.jsx';
import Profile from './components/protected/Profile.jsx';

function App() {
    return (
        <Router>
            {/* Навигационная панель всегда отображается */}
            <NavBar />

            <Routes>
                {/* Главная страница */}
                <Route path="/" element={<Home />}>
                    <Route index element={<UsersProducts />} />
                    <Route path=":id" element={<UserProducts />} />
                </Route>

                {/* Страница авторизации */}
                <Route path="/auth" element={<Auth />} />
                <Route path="/signup" element={<Auth authType="signup" />} />

                {/* Дополнительные страницы */}
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />

                {/* Защищённые маршруты */}
                <Route element={<ProtectedRoutes />}>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/edit" element={<ProfileEdit />} />
                </Route>

                {/* Страница 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
