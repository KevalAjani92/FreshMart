// src/store/useAuthStore.js
import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  fetchUser: async () => {
    try {
      const res = await axios.get("https://localhost:7188/api/Auth/me");
      set({ user: res.data, loading: false });
      console.log("User fetched:", res.data);
    } catch {
      set({ user: null, loading: false });
    }
  },

  login: async (credentials) => {
    try {
      const res = await axios.post(
        "https://localhost:7188/api/Auth/login",
        credentials
      );
      set({ user: res.data.user });
      console.log("Login successful:", res.data);
      return { success: true, role: res.data.user.role };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || "Login failed",
      };
    }
  },

  logout: async () => {
    await axios.post("https://localhost:7188/api/Auth/logout",{},{
        withCredentials: true
    });
    set({ user: null });
  },
}));
