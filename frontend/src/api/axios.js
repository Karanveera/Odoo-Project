// src/api/axios.js
import axios from "axios";
import { API } from "../config";

const instance = axios.create({
  baseURL: API,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("🔑 Attaching token:", token); // Debug token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
