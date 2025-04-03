import React, { useEffect, useState } from 'react';
import sha256 from 'js-sha256';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import url from '../../../helpers/getURL.js';
import { useForm } from 'react-hook-form';
import {
    banUser,
    createUser,
    deleteUser,
    getAllUsers,
    updateUser,
} from '../../../helpers/adminPanel.js';

import { hashPassword } from '../../../helpers/hashedPassword.js';

const AdminPanel = () => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            contacts: '',
            role: 'user',
        },
    });
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [editData, setEditData] = useState({
        username: '',
        email: '',
        contacts: '',
    });

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const users = await getAllUsers();
            setUsers(users);
            const data = await res.json();
            setUsers(data.data);
          } catch (error) {
            console.error("Klaida įkeliant naudotojus:", error);
          }
        };
        fetchUsers();
      }, []);

      const handleDelete = async (userId) => {
        if (!window.confirm("Ištrinti naudotoją?")) return;
        try {
          const res = await deleteUser(userId);
          console.log("Удаляется пользователь с ID:", userId);
          if (res.status === 204) {
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
          } else {
            const errorData = await res.json();
            console.error("Pašalinimo klaida:", errorData.message);
          }
        } catch (err) {
          console.error("Serverio klaida:", err);
        }
      };

      const handleBan = async (userId) => {
        try {
          await banUser(userId);
          setUsers((prev) =>
            prev.map((user) =>
              user.id === userId ? { ...user, role: "banned" } : user
            )
          );
        } catch (error) {
          console.error("Klaida uždraudžiant naudotoją:", error);
        }
      };

      const handleSaveEdit = async () => {
        try {
          await updateUser(editingUser, editData);
          const data = await res.json();
          if (res.ok) {
            toast.success("Vartotojas atnaujintas!");
            setUsers((prev) =>
              prev.map((u) => (u.id === editingUser ? { ...u, ...editData } : u))
            );
            setEditingUser(null);
          } else {
            console.error("Atnaujinimo klaida:", data.message);
          }
        } catch (err) {
          console.error("Klaida išsaugant:", err);
        }
      };

    const handleEditUser = (user) => {
        setEditingUser(user.id);
        setEditData({
            username: user.username,
            email: user.email,
            contacts: user.contacts || '',
        });
    };

    return (
        <div className="p-4 sm:p-6 max-w-7xl mx-auto text-gray-900 dark:text-white">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
                Administratoriaus skydelis
            </h1>

            {/* Forma */}
            <div className="bg-neutral-100 dark:bg-gray-800 p-4 sm:p-6 rounded-lg mb-8 sm:mb-10 shadow-lg">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                    Sukurti naudotoją
                </h2>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar
                />

                <form
                    onSubmit={handleSubmit(async (data) => {
                        try {
                          const password = hashPassword(data.password, data.username);
                      
                          const payload = {
                            ...data,
                            password,
                          };
                      
                          const result = await createUser(payload);
                          toast.success("Vartotojas sėkmingai sukurtas!");
                          setUsers((prev) => [...prev, result.data]);
                          reset();
                        } catch (err) {
                          console.error("Klaida kuriant naudotoją:", err.response?.data || err);
                        }
                      })}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4"
                >
                    <input
                        type="text"
                        {...register('username', { required: true })}
                        placeholder="Vartotojo vardas"
                        className="p-2 rounded bg-gray-100 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
                    />

                    <input
                        type="email"
                        {...register('email', { required: true })}
                        placeholder="Email"
                        className="p-2 rounded bg-gray-100 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
                    />

                    <input
                        type="password"
                        {...register('password', { required: true })}
                        placeholder="Slaptažodis"
                        className="p-2 rounded bg-gray-100 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
                    />

                    <input
                        type="text"
                        {...register('contacts')}
                        placeholder="Kontaktai"
                        className="p-2 rounded bg-gray-100 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
                    />

                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                        <select
                            {...register('role')}
                            defaultValue="user"
                            className="w-full sm:w-auto p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                            <option value="user">User</option>
                            <option value="courier">Courier</option>
                            <option value="admin">Admin</option>
                        </select>
                        <button
                            type="submit"
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        >
                            Sukurti
                        </button>
                    </div>
                </form>
            </div>

            {/* Lentelė */}
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                    Naudotojų sąrašas
                </h2>

                {users.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {users.map((user) => (
                            <div
                                key={user.id}
                                className="bg-neutral-100 dark:bg-gray-700 p-4 rounded-lg shadow transition"
                            >
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                    ID: {user.id}
                                </p>

                                {editingUser === user.id ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editData.username}
                                            onChange={(e) =>
                                                setEditData({
                                                    ...editData,
                                                    username: e.target.value,
                                                })
                                            }
                                            className="w-full mb-1 p-1 rounded bg-gray-100 dark:bg-gray-600 text-sm"
                                        />
                                        <input
                                            type="email"
                                            value={editData.email}
                                            onChange={(e) =>
                                                setEditData({
                                                    ...editData,
                                                    email: e.target.value,
                                                })
                                            }
                                            className="w-full mb-1 p-1 rounded bg-gray-100 dark:bg-gray-600 text-sm"
                                        />
                                        <input
                                            type="text"
                                            value={editData.contacts}
                                            onChange={(e) =>
                                                setEditData({
                                                    ...editData,
                                                    contacts: e.target.value,
                                                })
                                            }
                                            className="w-full mb-1 p-1 rounded bg-gray-100 dark:bg-gray-600 text-sm"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <div className="flex justify-between items-center mb-1">
                                            <p className="font-semibold text-lg">
                                                {user.username}
                                            </p>
                                            <button
                                                onClick={() =>
                                                    handleEditUser(user)
                                                }
                                                className="text-blue-400 hover:text-blue-600 text-sm"
                                                title="Redaguoti"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    class="size-6"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            {user.email}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            Kontaktai: {user.contacts || '—'}
                                        </p>
                                    </>
                                )}

                                {/* Роль */}
                                <div className="mt-3">
                                    <label className="text-sm text-gray-500 dark:text-gray-300 block mb-1">
                                        Vaidmuo:
                                    </label>
                                    <select
                                        value={user.role}
                                        onChange={async (e) => {
                                            const newRole = e.target.value;
                                            try {
                                                const res = await fetch(
                                                    url(
                                                        `admin/users/role/${user.id}`
                                                    ),
                                                    {
                                                        method: 'PATCH',
                                                        headers: {
                                                            'Content-Type':
                                                                'application/json',
                                                        },
                                                        credentials: 'include',
                                                        body: JSON.stringify({
                                                            role: newRole,
                                                        }),
                                                    }
                                                );
                                                let resultText =
                                                    await res.text();
                                                let result;
                                                try {
                                                    result =
                                                        JSON.parse(resultText);
                                                } catch (err) {
                                                    console.error(
                                                        'Server returned non-JSON:',
                                                        resultText
                                                    );
                                                    return;
                                                }

                                                if (res.ok) {
                                                    setUsers((prev) =>
                                                        prev.map((u) =>
                                                            u.id === user.id
                                                                ? {
                                                                      ...u,
                                                                      role: newRole,
                                                                  }
                                                                : u
                                                        )
                                                    );
                                                } else {
                                                    console.error(
                                                        'Klaida keičiant vaidmenį:',
                                                        result?.message ||
                                                            'Unknown error'
                                                    );
                                                }
                                            } catch (err) {
                                                console.error(
                                                    'Tinklo klaida keičiant vaidmenį:',
                                                    err
                                                );
                                            }
                                        }}
                                        className="w-full bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white rounded px-2 py-1"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                        <option value="courier">Courier</option>
                                        <option value="banned">Banned</option>
                                    </select>
                                </div>

                                {/* Veiksmai */}
                                {editingUser === user.id ? (
                                    <div className="mt-4 flex justify-between text-sm font-medium">
                                        <button
                                            onClick={handleSaveEdit}
                                            className="text-green-600 dark:text-green-400 hover:underline"
                                        >
                                            Išsaugoti
                                        </button>
                                        <button
                                            onClick={() => setEditingUser(null)}
                                            className="text-gray-500 hover:underline"
                                        >
                                            Atšaukimas
                                        </button>
                                    </div>
                                ) : (
                                    <div className="mt-4 flex justify-between text-sm font-medium">
                                        <button
                                            onClick={() => handleBan(user.id)}
                                            className="text-red-600 dark:text-red-400 hover:underline"
                                        >
                                            Ban
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(user.id)
                                            }
                                            className="text-red-700 dark:text-red-500 hover:underline"
                                        >
                                            Ištrinti
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-400 py-4">
                        Naudotojų nerasta.
                    </p>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;