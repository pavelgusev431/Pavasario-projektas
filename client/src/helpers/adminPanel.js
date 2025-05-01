import axios from "axios";
import url from "./getURL";

const API = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const getAllUsers = async () => {
  const res = await API.get(url("admin/users"));
  return res.data.data;
};

export const createUser = async (userData) => {
  const res = await API.post(url("admin/users"), userData);
  return res.data;
};

export const deleteUser = async (id) => {
  return await API.delete(url(`admin/users/${id}`));
};

export const banUser = async (id) => {
  await API.post(url(`admin/users/ban/${id}`));
};

export const updateUser = async (id, data) => {
  const res = await API.patch(url(`admin/users/${id}`), data);
  return res.data;
};

export const updateUserRole = async (id, role) => {
  const res = await API.patch(url(`admin/users/role/${id}`), { role });
  return res.data;
};

export const getAllEvents = async () => {
  const res = await API.get(url("admin/events"));
  return res.data;
};
