import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "sonner";

export const useClientStore = create((set) => ({

  latestEvent: null,
  isLoadingEvent: false,

  isSendingMessage: false,


  sendMessage: async (data) => {
    try {
      set({ isSendingMessage: true });
      const response = await axiosInstance.post("/client/submit-form", data);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSendingMessage: false });
    }
  },

  fetchLatestEvent: async () => {
    try {
      set({ isLoadingEvent: true });
      const response = await axiosInstance.get("/client/latest-event");
      set({ latestEvent: response.data });
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ isLoadingEvent: false });
    }
  },
}));
