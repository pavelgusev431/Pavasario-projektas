import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);  // ✅ Пользователь по умолчанию NULL
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            // 🔥 Проверяем токен в куках и localStorage
            let token = Cookies.get("authToken") || localStorage.getItem("authToken");
        
            if (!token) {
                console.warn("⚠️ Токен отсутствует в куках и localStorage, пользователь не авторизован.");
                setLoading(false);
                return;  // ✅ Выходим, если нет токена
            }
        
            console.log("🚀 Отправка запроса с токеном:", token);
        
            try {
                const response = await axios.get("http://localhost:3000/auth/me", {
                    withCredentials: true,
                    credentials: "include",
                    headers: { Authorization: `Bearer ${token}` },
                });
        
                console.log("✅ Успешный ответ от сервера:", response.data);
                setUser(response.data.data);
            } catch (error) {
                console.error("❌ Ошибка загрузки пользователя:", error.response?.data || error.message);
                
                // Если ошибка 401 (Unauthorized) - очищаем токен
                if (error.response?.status === 401) {
                    console.warn("⚠️ Токен недействителен, удаляем его из хранилищ.");
                    Cookies.remove("authToken");
                    localStorage.removeItem("authToken");
                    setUser(null);
                }
            } finally {
                setLoading(false);
            }
        };
        
        fetchUserData();
    }, []);        

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {loading ? <div className="text-center py-4">Загрузка...</div> : children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
