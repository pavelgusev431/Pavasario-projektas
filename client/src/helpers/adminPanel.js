import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

// Получить всех пользователей
export const getAllUsers = async () => {
  const res = await API.get("admin/users");
  return res.data.data;
};

// Создать нового пользователя
export const createUser = async (userData) => {
  const res = await API.post("admin/users", userData);
  return res.data;
};

// Удалить пользователя
export const deleteUser = async (id) => {
  return await API.delete(`admin/users/${id}`);
};

// Забанить пользователя
export const banUser = async (id) => {
  await API.post(`admin/users/ban/${id}`);
};

// Обновить данные пользователя
export const updateUser = async (id, data) => {
  const res = await API.patch(`admin/users/${id}`, data);
  return res.data;
};

// Изменить роль пользователя
export const updateUserRole = async (id, role) => {
  const res = await API.patch(`admin/users/role/${id}`, { role });
  return res.data;
};