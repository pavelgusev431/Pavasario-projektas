import { useContext, useState } from "react";
import ModalEmail from "./ModalEmail.jsx";
import ModalUsername from "./ModalUsername.jsx";
import ModalContacts from "./ModalContacts.jsx";
import ModalDescription from "./ModalDescription.jsx";
import ModalPassword from "./ModalPassword.jsx";
import ModalPicture from "./ModalPicture.jsx";
import { AuthContext } from "../../../contexts/AuthContext.jsx";

const ProfileInfo = () => {
  const { auth } = useContext(AuthContext);

  const [editModalEmail, setEditModalEmail] = useState(false);
  const [editModalUsername, setEditModalUsername] = useState(false);
  const [editModalPassword, setEditModalPassword] = useState(false);
  const [editModalDesc, setEditModalDesc] = useState(false);
  const [editModalContacts, setEditModalContacts] = useState(false);
  const [editModalPicture, setEditModalPicture] = useState(false);

  const resetModals = () => {
    setEditModalUsername(false);
    setEditModalContacts(false);
    setEditModalDesc(false);
    setEditModalPassword(false);
    setEditModalPicture(false);
    setEditModalEmail(false);
  };

  const handleChangeEmail = () => {
    resetModals();
    setEditModalEmail(true);
  };

  const handleChangeUsername = () => {
    resetModals();
    setEditModalUsername(true);
  };

  const handleChangeDescription = () => {
    resetModals();
    setEditModalDesc(true);
  };

  const handleChangeContacts = () => {
    resetModals();
    setEditModalContacts(true);
  };

  const handleChangePassword = () => {
    resetModals();
    setEditModalPassword(true);
  };

  const handleChangePicture = () => {
    resetModals();
    setEditModalPicture(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-2xl p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="flex items-center mb-6">
          <div className="w-2 h-8 bg-red-500 mr-3"></div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Profile Information
          </h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-300">
                Email
              </span>
              <span className="text-lg dark:text-white">{auth?.email}</span>
            </div>
            <button
              onClick={handleChangeEmail}
              className="p-2 text-gray-600 hover:text-red-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-red-400 dark:hover:bg-gray-600 rounded-full transition duration-200"
            >
              <span className="text-xl">🖉</span>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-300">
                Username
              </span>
              <span className="text-lg dark:text-white">{auth?.username}</span>
            </div>
            <button
              onClick={handleChangeUsername}
              className="p-2 text-gray-600 hover:text-red-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-red-400 dark:hover:bg-gray-600 rounded-full transition duration-200"
            >
              <span className="text-xl">🖉</span>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-300">
                Password
              </span>
              <span className="text-lg dark:text-white">••••••••</span>
            </div>
            <button
              onClick={handleChangePassword}
              className="p-2 text-gray-600 hover:text-red-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-red-400 dark:hover:bg-gray-600 rounded-full transition duration-200"
            >
              <span className="text-xl">🖉</span>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex flex-col flex-1">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-300">
                Description
              </span>
              <span className="text-lg dark:text-white">
                {auth?.description || "Nothing here :("}
              </span>
            </div>
            <button
              onClick={handleChangeDescription}
              className="p-2 text-gray-600 hover:text-red-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-red-400 dark:hover:bg-gray-600 rounded-full transition duration-200"
            >
              <span className="text-xl">🖉</span>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex flex-col flex-1">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-300">
                Contacts
              </span>
              <span className="text-lg dark:text-white">
                {auth?.contacts || "Nothing here :("}
              </span>
            </div>
            <button
              onClick={handleChangeContacts}
              className="p-2 text-gray-600 hover:text-red-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-red-400 dark:hover:bg-gray-600 rounded-full transition duration-200"
            >
              <span className="text-xl">🖉</span>
            </button>
          </div>

          <div className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-300 mb-3">
              Avatar
            </span>
            <div className="relative mb-4">
              <img
                src={auth.image_url}
                alt="Your avatar"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 dark:border-gray-500"
              />
              <button
                onClick={handleChangePicture}
                className="absolute bottom-0 right-0 bg-white dark:bg-gray-600 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-500 transition duration-200"
              >
                <span className="text-gray-600 dark:text-white hover:text-red-500">
                  🖉
                </span>
              </button>
            </div>
          </div>
        </div>

        {editModalEmail && (
          <ModalEmail
            user={auth}
            showModal={editModalEmail}
            setShowModal={setEditModalEmail}
          />
        )}

        {editModalUsername && (
          <ModalUsername
            user={auth}
            showModal={editModalUsername}
            setShowModal={setEditModalUsername}
          />
        )}

        {editModalDesc && (
          <ModalDescription
            user={auth}
            showModal={editModalDesc}
            setShowModal={setEditModalDesc}
          />
        )}

        {editModalContacts && (
          <ModalContacts
            user={auth}
            showModal={editModalContacts}
            setShowModal={setEditModalContacts}
          />
        )}

        {editModalPassword && (
          <ModalPassword
            user={auth}
            showModal={editModalPassword}
            setShowModal={setEditModalPassword}
          />
        )}

        {editModalPicture && (
          <ModalPicture
            user={auth}
            showModal={editModalPicture}
            setShowModal={setEditModalPicture}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
