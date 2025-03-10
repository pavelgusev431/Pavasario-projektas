import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { FaUserCircle } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";
import axios from "axios";

const Navbar = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:3000/auth/logout", {}, { withCredentials: true });
            setAuth(null);
            navigate("/login", "/signup");
        } catch (error) {
            console.error("Ошибка при выходе:", error.response?.data || error.message);
        }
    };

    return (
        <nav className="bg-white shadow-lg fixed top-0 left-0 w-full z-50 transition-all duration-300">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Логотип */}
                <div className="flex items-center cursor-pointer" onClick={() => navigate("/home")}>
                    <img src="/path/to/logo.png" alt="Logo" className="h-10" />
                </div>

                {/* Десктоп-меню */}
                <div className="hidden md:flex items-center space-x-6 text-lg font-medium">
                    <Link to="/home" className="hover:text-blue-600 transition">Главная</Link>
                    <Link to="/contact" className="hover:text-blue-600 transition">Контакты</Link>
                    <Link to="/about" className="hover:text-blue-600 transition">О нас</Link>
                    <Link to="/profile/edit" className="hover:text-blue-600 transition">Edit profile</Link>

                    {/* Авторизация */}
                    {!auth ? (
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/signup"
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                            >
                                Регистрация
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Link to="/profile" className="flex items-center space-x-2 hover:text-blue-600 transition">
                                <FaUserCircle className="text-2xl" />
                                <span>Профиль</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition"
                            >
                                <IoMdLogOut className="text-2xl" />
                                <span>Выйти</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Мобильное меню (бургер) */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-3xl focus:outline-none">
                        {menuOpen ? <HiX /> : <HiMenu />}
                    </button>
                </div>
            </div>

            {/* Мобильное выпадающее меню */}
            {menuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md py-6 transition-all">
                    <div className="flex flex-col items-center space-y-4">
                        <Link to="/home" className="text-lg font-medium hover:text-blue-600 transition" onClick={() => setMenuOpen(false)}>Главная</Link>
                        <Link to="/contact" className="text-lg font-medium hover:text-blue-600 transition" onClick={() => setMenuOpen(false)}>Контакты</Link>
                        <Link to="/about" className="text-lg font-medium hover:text-blue-600 transition" onClick={() => setMenuOpen(false)}>О нас</Link>
                        <Link to="/profile/edit" className="text-lg font-medium hover:text-blue-600 transition" onClick={() => setMenuOpen(false)}>ProfileEdit</Link>


                        {/* Авторизация */}
                        {!auth ? (
                            <div className="flex flex-col items-center space-y-3">
                                <Link
                                    to="/login"
                                    className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition w-40 text-center"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Войти
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition w-40 text-center"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Регистрация
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Link to="/profile" className="flex items-center space-x-2 hover:text-blue-600 transition" onClick={() => setMenuOpen(false)}>
                                    <FaUserCircle className="text-2xl" />
                                    <span>Профиль</span>
                                </Link>
                                <button
                                    onClick={() => { handleLogout(); setMenuOpen(false); }}
                                    className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition"
                                >
                                    <IoMdLogOut className="text-2xl" />
                                    <span>Выйти</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
export default Navbar;
