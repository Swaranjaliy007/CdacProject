import axios from "axios";

// Base API URL
const API_BASE_URL = "http://localhost:8080/api"; // Update with backend URL

// Axios instance with default settings
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Set Authorization header (Call this after login)
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Orphanages API
export const getOrphanages = () => api.get("/orphanages");
export const getOrphanageById = (id) => api.get(`/orphanages/${id}`);
export const createOrphanage = (data) => api.post("/orphanages", data);
export const updateOrphanage = (id, data) => api.put(`/orphanages/${id}`, data);
export const deleteOrphanage = (id) => api.delete(`/orphanages/${id}`);

// Children API
export const getChildren = () => api.get("/children");
export const getChildById = (id) => api.get(`/children/${id}`);
export const addChild = (orphanageId, data) => api.post(`/children/${orphanageId}`, data);
export const updateChild = (id, data) => api.put(`/children/${id}`, data);
export const deleteChild = (id) => api.delete(`/children/${id}`);

// Staff API
export const getStaff = () => api.get("/staff");
export const getStaffById = (id) => api.get(`/staff/${id}`);
export const addStaff = (orphanageId, data) => api.post(`/staff/${orphanageId}`, data);
export const updateStaff = (id, data) => api.put(`/staff/${id}`, data);
export const deleteStaff = (id) => api.delete(`/staff/${id}`);

// Users API
export const registerUser = (data) => api.post("/users", data);
export const loginUser = (data) => api.post("/users/login", data);
export const getUsers = () => api.get("/users");
export const getUserById = (id) => api.get(`/users/${id}`);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// Donations API
export const getDonations = () => api.get("/donations");
export const getDonationById = (id) => api.get(`/donations/${id}`);
export const makeDonation = (userId, orphanageId, data) => api.post(`/donations/${userId}/${orphanageId}`, data);

// Adoptions API
export const getAdoptions = () => api.get("/adoptions");
export const getAdoptionById = (id) => api.get(`/adoptions/${id}`);
export const adoptChild = (userId, childId, data) => api.post(`/adoptions/${userId}/${childId}`, data);

export default api;
