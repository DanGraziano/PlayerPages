import axios from "axios";
//const SERVER_API_URL = process.env.REACT_APP_SERVER_URL;
const SERVER_API_URL = "http://localhost:4000/api";
const USERS_URL = `${SERVER_API_URL}/users`;

const api = axios.create({ withCredentials: true });

export const login = async ({ email, password }) => {
  const response = await api.post(`${USERS_URL}/login`, { email, password });
  const user = response.data;
  return user;
};


export const logout = async () => {
  const response = await api.post(`${USERS_URL}/logout`);
  return response.data;
};


export const profile = async () => {
  console.log("profile")
  const response = await api.post(`${USERS_URL}/profile`);
  return response;
};

export const updateUser = async (user) => {
  console.log(user);
  const response = await api.put(`${USERS_URL}/update/${user._id}`, {user});
  return response.data;
};

export const register = async ({ username, email, password, accountType }) => {
  const response = await api.post(`${USERS_URL}/register`, { username, email, password, accountType});
  return response.data;
};
