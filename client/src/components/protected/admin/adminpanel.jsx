import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import {
    banUser,
    createUser,
    deleteUser,
    getAllUsers,
    updateUser,
    updateUserRole,
    getAllEvents,
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
    const [events, setEvents] = useState([]);
    const [activeTab, setActiveTab] = useState('users');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await getAllUsers();
                setUsers(users);
            } catch (error) {
                console.error('Klaida įkeliant naudotojus:', error);
            }
        };

        const fetchEvents = async () => {
            try {
                const res = await getAllEvents();

                // Сортировка по убыванию timestamp
                const sortedEvents = res.sort(
                    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
                );

                setEvents(sortedEvents);
            } catch (error) {
                console.error('Klaida įkeliant įvykius:', error);
            }
        };

        fetchUsers();
        fetchEvents();

        const interval = setInterval(() => {
            fetchEvents();
        }, 2000); //Update every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const handleDelete = async (userId) => {
        if (!window.confirm('Ištrinti naudotoją?')) return;
        try {
            const res = await deleteUser(userId);
            if (res.status === 204) {
                setUsers((prevUsers) =>
                    prevUsers.filter((user) => user.id !== userId)
                );
            } else {
                const errorData = await res.json();
                console.error('Pašalinimo klaida:', errorData.message);
            }
        } catch (err) {
            console.error('Serverio klaida:', err);
        }
    };

    const handleBan = async (userId) => {
        try {
            await banUser(userId);
            setUsers((prev) =>
                prev.map((user) =>
                    user.id === userId ? { ...user, role: 'banned' } : user
                )
            );
        } catch (error) {
            console.error('Klaida uždraudžiant naudotoją:', error);
        }
    };

    const handleSaveEdit = async () => {
        try {
            await updateUser(editingUser, editData);
            toast.success('Vartotojas atnaujintas!');
            setUsers((prev) =>
                prev.map((u) =>
                    u.id === editingUser ? { ...u, ...editData } : u
                )
            );
            setEditingUser(null);
        } catch (err) {
            console.error('Klaida išsaugant:', err);
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

    const filteredEvents = events.filter((event) => {
        const term = searchTerm.toLowerCase();
        return (
            event.user?.username?.toLowerCase().includes(term) ||
            event.description?.toLowerCase().includes(term) ||
            event.eventType?.name?.toLowerCase().includes(term) ||
            new Date(event.timestamp)
                .toLocaleString()
                .toLowerCase()
                .includes(term)
        );
    });

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
                            const password = hashPassword(data.password);

                            const payload = {
                                ...data,
                                password,
                                role: data.role,
                            };

                            const result = await createUser(payload);
                            toast.success('Vartotojas sėkmingai sukurtas!');
                            const updatedUsers = await getAllUsers();
                            setUsers(updatedUsers);
                            reset();
                        } catch (err) {
                            console.error(
                                'Klaida kuriant naudotoją:',
                                err.response?.data || err
                            );
                        }
                    })}
                    className="flex flex-nowrap overflow-x-auto gap-4 pb-2"
                >
                    <input
                        type="text"
                        {...register('username', { required: true })}
                        placeholder="Vartotojo vardas"
                        className="min-w-[200px] p-2 rounded bg-gray-100 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
                    />

                    <input
                        type="email"
                        {...register('email', { required: true })}
                        placeholder="Email"
                        className="min-w-[200px] p-2 rounded bg-gray-100 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
                    />

                    <input
                        type="password"
                        {...register('password', { required: true })}
                        placeholder="Slaptažodis"
                        className="min-w-[180px] p-2 rounded bg-gray-100 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
                    />

                    <input
                        type="text"
                        {...register('contacts')}
                        placeholder="Kontaktai"
                        className="w-[4cm] p-2 rounded bg-gray-100 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
                    />

                    <select
                        {...register('role')}
                        className="w-[2.5cm] p-2 rounded bg-[#364153] dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="courier">Courier</option>
                        <option value="banned">Banned</option>
                    </select>

                    <button
                        type="submit"
                        className="min-w-[120px] bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Sukurti
                    </button>
                </form>
            </div>

            <div className="mb-3 justify-end flex gap-4">
                <button
                    onClick={() => setActiveTab('users')}
                    className={`px-4 py-2 rounded ${
                        activeTab === 'users'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-300 dark:bg-gray-700 text-black dark:text-white'
                    }`}
                >
                    Naudotojai
                </button>
                <button
                    onClick={() => setActiveTab('events')}
                    className={`px-4 py-2 rounded ${
                        activeTab === 'events'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-300 dark:bg-gray-700 text-black dark:text-white'
                    }`}
                >
                    Visi įvykiai
                </button>
            </div>
            {activeTab === 'users' && (
                <>
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
                                                            username:
                                                                e.target.value,
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
                                                            email: e.target
                                                                .value,
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
                                                            contacts:
                                                                e.target.value,
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
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="size-6"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    {user.email}
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    Kontaktai:{' '}
                                                    {user.contacts || '—'}
                                                </p>
                                            </>
                                        )}

                                        {/* Роль */}
                                        <div className="mt-3">
                                            <label
                                                htmlFor="role_select"
                                                className="text-sm text-gray-500 dark:text-gray-300 block mb-1"
                                            >
                                                Vaidmuo:
                                            </label>
                                            <select
                                                id="role_select"
                                                value={user.role}
                                                onChange={async (e) => {
                                                    const newRole =
                                                        e.target.value;
                                                    try {
                                                        await updateUserRole(
                                                            user.id,
                                                            newRole
                                                        );
                                                        setUsers(
                                                            users.map((u) =>
                                                                u.id === user.id
                                                                    ? {
                                                                          ...u,
                                                                          role: newRole,
                                                                      }
                                                                    : u
                                                            )
                                                        );
                                                    } catch (err) {
                                                        console.error(
                                                            'Klaida keičiant vaidmenį:',
                                                            err
                                                        );
                                                    }
                                                }}
                                                className="w-full bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white rounded px-2 py-1"
                                            >
                                                <option value="user">
                                                    User
                                                </option>
                                                <option value="admin">
                                                    Admin
                                                </option>
                                                <option value="courier">
                                                    Courier
                                                </option>
                                                <option value="banned">
                                                    Banned
                                                </option>
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
                                                    onClick={() =>
                                                        setEditingUser(null)
                                                    }
                                                    className="text-gray-500 hover:underline"
                                                >
                                                    Atšaukimas
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="mt-4 flex justify-between text-sm font-medium">
                                                <button
                                                    onClick={() =>
                                                        handleBan(user.id)
                                                    }
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
                </>
            )}
            {activeTab === 'events' && (
                <div className="bg-white dark:bg-gray-800 max-h-[25cm] p-4 rounded-lg shadow-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                        <h2 className="text-xl font-semibold">Visi įvykiai</h2>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Ieškoti įvykiuose..."
                            className="px-3 py-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 w-full sm:w-[300px]"
                        />
                    </div>

                    {events.length > 0 ? (
                        <div className="overflow-y-auto max-h-[470px]">
                            <table className="min-w-full text-sm text-left">
                                <thead className="border-b border-gray-300 dark:border-gray-600">
                                    <tr>
                                        <th className="px-4 py-2">ID</th>
                                        <th className="px-4 py-2">
                                            Naudotojas
                                        </th>
                                        <th className="px-4 py-2">Tipas</th>
                                        <th className="px-4 py-2">Tikslas</th>
                                        <th className="px-4 py-2">Aprašymas</th>
                                        <th className="px-4 py-2">Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredEvents.map((event) => (
                                        <tr
                                            key={event.id}
                                            className="border-b border-gray-200 dark:border-gray-700"
                                        >
                                            <td className="px-4 py-2">
                                                {event.id}
                                            </td>
                                            <td className="px-4 py-2">
                                                {event.user?.username || '—'}
                                            </td>
                                            <td className="px-4 py-2">
                                                {event.eventType?.name ||
                                                    event.type_id}
                                            </td>
                                            <td className="px-4 py-2">
                                                {event.description?.startsWith(
                                                    'ADDENDUM'
                                                )
                                                    ? 'transaction'
                                                    : event.eventType?.name ||
                                                      event.type_id}
                                            </td>

                                            <td className="px-4 py-2">
                                                {event.description}
                                            </td>
                                            <td className="px-4 py-2">
                                                {new Date(
                                                    event.timestamp
                                                ).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-center text-gray-400 py-4">
                            Įvykių nėra
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
