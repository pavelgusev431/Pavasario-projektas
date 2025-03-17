import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Pencil, Check } from "lucide-react";
import axios from "axios";

function ProfileEdit() {
  const [profile, setProfile] = useState({ vardas: "", el_pastas: "", aprasymas: "", kontaktai: "" });
  const [password, setPassword] = useState({ dabartinis: "", naujas: "", patvirtinimas: "" });
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("/placeholder.svg?height=100&width=100");
  const fileInputRef = useRef(null);
  const [editableField, setEditableField] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("📤 [FRONTEND] JWT Token:", token);

    const fetchUserData = async () => {
      console.log("🔹 Siųsti užklausą adresu: http://localhost:3000/auth/me");

      try {
        const response = await axios.get("http://localhost:3000/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        console.log("🟢 Gauti profilio duomenys:", response.data);

        const userData = response.data.data || response.data;

        setProfile({
          vardas: userData.username,
          el_pastas: userData.email,
          aprasymas: userData.description || "",
          kontaktai: userData.contacts || "",
        });

        if (userData.image_url) {
          setAvatarPreview(userData.image_url);
        }
      } catch (error) {
        console.error("❌ Klaida gaunant naudotojo duomenis:", error);
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

   
    const translatedNames = {
        dabartinis: "currentPassword",
        naujas: "newPassword",
        patvirtinimas: "confirmPassword"
    };

    setPassword((prev) => ({
        ...prev,
        [translatedNames[name] || name]: value
    }));
};



  const handleSaveProfile = async () => {
    console.log("📩 [FRONTEND] Siunčiami duomenys:", profile);
    try {
      const response = await axios.patch(
        "http://localhost:3000/users/profile/edit",
        {
          username: profile.vardas,
          email: profile.el_pastas,
          description: profile.aprasymas,
          contacts: profile.kontaktai
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        }
      );

      if (response.data && response.data.data) {
        const updatedProfile = response.data.data;
        console.log("🟢 [FRONTEND] Profilis sėkmingai atnaujintas:", updatedProfile);

        setProfile({
          vardas: updatedProfile.username,
          el_pastas: updatedProfile.email,
          aprasymas: updatedProfile.description || "",
          kontaktai: updatedProfile.contacts || "",
        });

        setEditableField(null);
        alert("✅ Duomenys sėkmingai atnaujinti!");
      } else {
        alert("⚠️ Nepavyko gauti atnaujintų duomenų!");
      }

    } catch (error) {
      console.error("❌ Klaida atnaujinant profilį:", error);

      if (error.response) {
        console.error("📌 Serverio atsakymas:", error.response.data);
        alert(`❌ Klaida: ${error.response.data.message || "Nežinoma klaida"}`);
      } else if (error.request) {
        console.error("📌 Serveris neatsakė:", error.request);
        alert("❌ Klaida: serveris neatsako");
      } else {
        console.error("📌 Klaida siunčiant užklausą:", error.message);
        alert(`❌ Klaida: ${error.message}`);
      }
    }
  };

  const handleSavePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = password;

    console.log("📤 Sending password change data:", { currentPassword, newPassword });

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("❌ Please fill in all fields!");
      return;
    }

    if (newPassword.length < 6) {
      alert("❌ The new password must be at least 6 characters long!");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("❌ New password and confirmation do not match!");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:3000/users/profile/password",
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          },
          withCredentials: true,
        }
      );

      console.log("✅ Server response:", response.data);
      alert("✅ Password changed successfully!");
      setPassword({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      console.error("❌ Error changing password:", error);
      if (error.response) {
        alert(`❌ Error: ${error.response.data.message || "Unknown error"}`);
      } else {
        alert("❌ Error: Server is not responding");
      }
    }
};


  const togglePasswordSection = () => {
    setShowPasswordSection((prev) => !prev);
  };

  if (!profile) {
    return <p className="text-center text-gray-500">Загрузка...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-[4cm]">
      <h1 className="text-center text-2xl font-semibold text-red-500 mb-6">
      Edit profile
      </h1>

      <form>
        {/* Profilio informacija */}
        <div className="space-y-4">
          {["vardas", "el_pastas", "aprasymas", "kontaktai"].map((field) => (
            <div key={field} className="relative">
              <label className="block text-gray-700 font-medium">
                {field === "vardas" ? "User Name" :
                 field === "el_pastas" ? "E-mail" :
                 field === "aprasymas" ? "Description" :
                 "Contacts"}
              </label>
              <div className="relative flex items-center">
                <input
                  type={field === "el_pastas" ? "email" : "text"}
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

        {/* Button to toggle the password change section */}
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={togglePasswordSection}
            className="text-blue-500 hover:underline"
          >
            {showPasswordSection ? "Paslėpti slaptažodžio keitimą" : "Rodyti slaptažodžio pakeitimą"}
          </button>
        </div>

        {showPasswordSection && (
  <div className="border-t pt-4 mt-6">
    <h2 className="text-xl font-semibold mb-4">Change Password</h2>

    <div className="space-y-4">
      {/* Current Password */}
      <div>
    <label className="block text-gray-700 font-medium">Current Password</label>
    <input
      type="password"
      name="currentPassword"
      value={password.currentPassword}
      onChange={handlePasswordChange}
      className="w-full px-4 py-2 border rounded-md"
      placeholder="Enter current password"
    />
</div>

<div>
    <label className="block text-gray-700 font-medium">New Password</label>
    <input
      type="password"
      name="newPassword"
      value={password.newPassword}
      onChange={handlePasswordChange}
      className="w-full px-4 py-2 border rounded-md"
      placeholder="Enter new password"
    />
</div>

      
<div>
    <label className="block text-gray-700 font-medium">Confirm New Password</label>
    <input
      type="password"
      name="confirmPassword"
      value={password.confirmPassword}
      onChange={handlePasswordChange}
      className="w-full px-4 py-2 border rounded-md"
      placeholder="Confirm new password"
    />
</div>

      {/* Save Button */}
      <div className="text-center mt-4">
        <button
          type="button"
          onClick={handleSavePassword}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Save Password
        </button>
      </div>
    </div>
  </div>
)}
      </form>
    </div>
  );
}

export default ProfileEdit;