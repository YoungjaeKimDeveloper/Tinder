import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
// Zustand is Global Statement Controller
export const useAuthStore = create((set) => ({
  authUser: null,
  checkingAuth: true,
  loading: false,

  signup: async (signupData) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post("/auth/signup", signupData);
      set({ authUser: res.data.user });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },
  login: async (LoginData) => {
    try {
      const res = await axiosInstance.post("/auth/login", LoginData);
      if (res.status == 200) {
        toast.success("LOGIN SUCCESSFULLY");
        set({ authUser: res.data.user });
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
      set({ authUser: null });
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      if (res.status === 200) {
        toast.success("You have loggedOut Successfully");
        set({ authUser: null });
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      set({ authUser: res.data.user });
    } catch (error) {
      console.log(error);
      set({ authUser: null });
    } finally {
      set({ checkingAuth: false });
    }
  },
}));
