import { Routes, Route } from 'react-router-dom';  
import Auth from './components/layout/Register_Login/Auth.jsx';
import PasswordReset from './components/layout/Register_Login/PasswordReset.jsx';

import Home from './components/layout/Home.jsx';
import Contact from './components/layout/Contact.jsx';
import About from './components/layout/About.jsx';
import NotFound from './components/layout/NotFound.jsx';
import NavBar from './components/layout/NavBar.jsx';

import UsersProducts from './components/UsersProducts.jsx';
import UserProducts from './components/UserProducts.jsx';

import ProtectedRoutes from './components/layout/ProtectedRoutes.jsx';
import ProfileEdit from './components/protected/ProfileEdit.jsx';
import Profile from './components/protected/Profile.jsx';

function App() {
    return (
        <>
            {/* ✅ NavBar должен быть ВНЕ Routes, но внутри Router */}
            <NavBar />
            
            <Routes>
                {/* Главная страница */}
                <Route path="/home" element={<Home />} />
                <Route path="/products/user/:id" element={<UserProducts />} />

                {/* Аутентификация */}
                <Route path="/auth" element={<Auth />} />
                <Route path="/signup" element={<Auth authType="signup" />} />
                <Route path="/reset/:userid/:salt" element={<PasswordReset />} />

                {/* Статические страницы */}
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />

                {/* Защищённые маршруты */}
                <Route element={<ProtectedRoutes />}>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/edit" element={<ProfileEdit />} />
                </Route>

                {/* Страница "Не найдено" */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
