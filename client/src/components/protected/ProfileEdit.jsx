import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Pencil, Check } from "lucide-react";
import axios from "axios";

function ProfileEdit() {
  const [profile, setProfile] = useState({ username: "", email: "", description: "", contacts: "" });
  const [password, setPassword] = useState({ current: "", new: "", confirm: "" });
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("/placeholder.svg?height=100&width=100");
  const fileInputRef = useRef(null);
  const [editableField, setEditableField] = useState(null);

  // Загружаем данные пользователя при монтировании компонента
  useEffect(() => {
    const fetchUserData = async () => {
      console.log("🔹 Отправляем запрос на: http://localhost:3000/auth/me");

      try {
        const response = await axios.get("http://localhost:3000/auth/me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        });

        console.log("🟢 Полученные данные профиля:", response.data);
        setProfile({
          username: response.data.username,
          email: response.data.email,
          description: response.data.description || "",
          contacts: response.data.contacts || "",
        });

        if (response.data.image_url) {
          setAvatarPreview(response.data.image_url);
        }
      } catch (error) {
        console.error("❌ Ошибка при загрузке данных пользователя:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      const response = await axios.put("http://localhost:3000/users/profile/edit", profile, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        withCredentials: true,
      });

      setProfile(response.data.data);
      setEditableField(null);
      alert("✅ Данные успешно обновлены!");
    } catch (error) {
      console.error("❌ Ошибка при обновлении профиля:", error);
      alert("Ошибка обновления профиля!");
    }
  };

  const handleSavePassword = async () => {
    console.log("📤 Отправляем данные для смены пароля:", password);

    if (password.new !== password.confirm) {
        alert("❌ Новый пароль и подтверждение пароля не совпадают!");
        return;
    }

    try {
        const response = await axios.put("http://localhost:3000/users/profile/password", password, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            withCredentials: true,
        });

        console.log("✅ Сервер ответил:", response.data);
        alert("✅ Пароль успешно изменён!");
        setPassword({ current: "", new: "", confirm: "" });
    } catch (error) {
        console.error("❌ Ошибка при изменении пароля:", error);

        if (error.response) {
            console.error("📌 Ответ сервера:", error.response.data);
            alert(`❌ Ошибка: ${error.response.data.message || "Неизвестная ошибка"}`);
        } else if (error.request) {
            console.error("📌 Сервер не ответил:", error.request);
            alert("❌ Ошибка: Сервер не отвечает");
        } else {
            console.error("📌 Ошибка при отправке запроса:", error.message);
            alert(`❌ Ошибка: ${error.message}`);
        }
    }
};



  const togglePasswordSection = () => {
    setShowPasswordSection((prev) => !prev);
  };

  if (!profile.username) {
    return <p className="text-center text-gray-500">Загрузка профиля...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-[4cm]">
      <h1 className="text-center text-2xl font-semibold text-red-500 mb-6">
        Редактирование профиля
      </h1>

      <form>
        {/* Фото профиля */}
        <div className="flex flex-col items-center space-y-4 mb-6">
          <div
            className="relative w-24 h-24 cursor-pointer border-2 border-dashed border-gray-300 hover:border-red-400 rounded-full flex items-center justify-center"
            onClick={() => fileInputRef.current?.click()}
          >
            <img src={avatarPreview} alt="Фото профиля" className="w-full h-full rounded-full object-cover" />
          </div>
          <input type="file" ref={fileInputRef} accept="image/*" className="hidden" />
        </div>

        {/* Поля профиля */}
        <div className="space-y-4">
          {["username", "email", "description", "contacts"].map((field) => (
            <div key={field} className="relative">
              <label className="block text-gray-700 font-medium">
                {field === "username" ? "Имя пользователя" :
                 field === "email" ? "Email" :
                 field === "description" ? "Описание" :
                 "Контакты"}
              </label>
              <div className="relative flex items-center">
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={profile[field]}
                  onChange={handleProfileChange}
                  className={`w-full px-4 py-2 pr-10 border rounded-md transition ${
                    editableField === field ? "border-blue-500 bg-white" : "border-gray-300 bg-gray-100"
                  }`}
                  readOnly={editableField !== field}
                />
                <button
                  type="button"
                  onClick={editableField === field ? handleSaveProfile : () => setEditableField(field)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-md transition text-gray-500 hover:text-gray-700"
                >
                  {editableField === field ? <Check className="w-5 h-5" /> : <Pencil className="w-6 h-6" />}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Изменение пароля */}
        <div className="border-t pt-4 mt-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Изменение пароля</h2>
            <button
              type="button"
              onClick={togglePasswordSection}
              className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-md"
            >
              {showPasswordSection ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>

          {showPasswordSection && (
            <div className="space-y-4">
              {["current", "new", "confirm"].map((type) => (
                <div key={type}>
                  <label className="block text-gray-700 font-medium">
                    {type === "current" ? "Текущий пароль" : type === "new" ? "Новый пароль" : "Подтверждение пароля"}
                  </label>
                  <input
                    type="password"
                    name={type}
                    value={password[type]}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:bg-white"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleSavePassword}
                className="w-full py-2 mt-4 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition"
              >
                Изменить пароль
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProfileEdit;
