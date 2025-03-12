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

  // Įkeliami naudotojo duomenys, kai komponentas užsikrauna
  useEffect(() => {
    const fetchUserData = async () => {
      console.log("🔹 Siunčiamas užklausa į: http://localhost:3000/auth/me");

      try {
        const response = await axios.get("http://localhost:3000/auth/me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        });

        console.log("🟢 Gauti profilio duomenys:", response.data);
        setProfile({
          vardas: response.data.username,
          el_pastas: response.data.email,
          aprasymas: response.data.description || "",
          kontaktai: response.data.contacts || "",
        });

        if (response.data.image_url) {
          setAvatarPreview(response.data.image_url);
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
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
        const response = await axios.put("http://localhost:3000/users/profile/edit", profile, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            withCredentials: true,
        });

        if (response.data && response.data.data) {
            setProfile(response.data.data);
            alert("✅ Duomenys sėkmingai atnaujinti!");
        } else {
            alert("⚠️ Nepavyko gauti atnaujintų duomenų!");
        }

        setEditableField(null);
    } catch (error) {
        console.error("❌ Klaida atnaujinant profilį:", error);

        if (error.response) {
            console.error("📌 Serverio atsakymas:", error.response.data);
            alert(`❌ Klaida: ${error.response.data.message || "Nežinoma klaida"}`);
        } else if (error.request) {
            console.error("📌 Serveris neatsakė:", error.request);
            alert("❌ Klaida: Serveris neatsako");
        } else {
            console.error("📌 Klaida siunčiant užklausą:", error.message);
            alert(`❌ Klaida: ${error.message}`);
        }
    }
};

  const handleSavePassword = async () => {
    console.log("📤 Siunčiami duomenys slaptažodžio keitimui:", password);

    if (password.naujas !== password.patvirtinimas) {
        alert("❌ Naujas slaptažodis ir patvirtinimas nesutampa!");
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

        console.log("✅ Serverio atsakymas:", response.data);
        alert("✅ Slaptažodis sėkmingai pakeistas!");
        setPassword({ dabartinis: "", naujas: "", patvirtinimas: "" });
    } catch (error) {
        console.error("❌ Klaida keičiant slaptažodį:", error);

        if (error.response) {
            console.error("📌 Serverio atsakymas:", error.response.data);
            alert(`❌ Klaida: ${error.response.data.message || "Nežinoma klaida"}`);
        } else if (error.request) {
            console.error("📌 Serveris neatsakė:", error.request);
            alert("❌ Klaida: Serveris neatsako");
        } else {
            console.error("📌 Klaida siunčiant užklausą:", error.message);
            alert(`❌ Klaida: ${error.message}`);
        }
    }
};

  const togglePasswordSection = () => {
    setShowPasswordSection((prev) => !prev);
  };

  if (!profile.vardas) {
    return <p className="text-center text-gray-500">Įkeliama...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-[4cm]">
      <h1 className="text-center text-2xl font-semibold text-red-500 mb-6">
        Redaguoti profilį
      </h1>

      <form>
        {/* Nuotraukos atnaujinimas */}
        <div className="flex flex-col items-center space-y-4 mb-6">
          <div
            className="relative w-24 h-24 cursor-pointer border-2 border-dashed border-gray-300 hover:border-red-400 rounded-full flex items-center justify-center"
            onClick={() => fileInputRef.current?.click()}
          >
            <img src={avatarPreview} alt="Profilio nuotrauka" className="w-full h-full rounded-full object-cover" />
          </div>
          <input type="file" ref={fileInputRef} accept="image/*" className="hidden" />
        </div>

        {/* Profilio informacija */}
        <div className="space-y-4">
          {["vardas", "el_pastas", "aprasymas", "kontaktai"].map((field) => (
            <div key={field} className="relative">
              <label className="block text-gray-700 font-medium">
                {field === "vardas" ? "Vartotojo vardas" :
                 field === "el_pastas" ? "El. paštas" :
                 field === "aprasymas" ? "Aprašymas" :
                 "Kontaktai"}
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

        {/* Slaptažodžio keitimas */}
        <div className="border-t pt-4 mt-6">
          <h2 className="text-xl font-semibold">Keisti slaptažodį</h2>
          <button
            type="button"
            onClick={togglePasswordSection}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-md"
          >
            {showPasswordSection ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileEdit;
