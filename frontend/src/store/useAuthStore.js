import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "sonner";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isSigningIn: false,
  isLoggingIn: false,
  isForgotPassLoading: false,
  isResetPassLoading: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth: ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  login: async (data) => {
    set({ isSigningIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningIn: false });
    }
  },

  forgotPassword: async (email) => {
    set({ isForgotPassLoading: true });
    try {
      const res = await axiosInstance.post("/auth/forgot-password", { email });
      toast.success(res.data.message);
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
    } finally {
      set({ isForgotPassLoading: false });
    }
  },

  resetPassword: async (token, password) => {
    set({ isResetPassLoading: true });
    try {
      const res = await axiosInstance.put(
        `/auth/reset-password?token=${token}`,
        { password }
      );
      toast.success(res.data.message);
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
    } finally {
      set({ isResetPassLoading: false });
    }
  },
}));
