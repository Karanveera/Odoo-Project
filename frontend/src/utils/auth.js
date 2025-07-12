// src/utils/auth.js
export const isLoggedIn = () => !!localStorage.getItem('token');
export const logout = () => localStorage.removeItem('token');
