import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "sonner";

export const useAdminStore = create((set) => ({
  requests: [],
  events: [],
  members: [],
  awards: [],
  messages: [],
  partners: [],

  isApproving: false,
  isDenying: false,
  isAddingMember: false,
  isCreatingEvent: false,
  isUpdatingEventStatus: false,
  isDeletingEvent: false,
  isDeletingMember: false,
  isDeletingAward: false,
  isLoadingAward: false,
  isAddingAward: false,
  isLoadingMessages: false,
  isMembersLoading: false,
  isEventsLoading: false,
  isLoadingPartner: false,
  isAddingPartner: false,
  isDeletingPartner: false,

  getMessages: async () => {
    try {
      set({ isLoadingMessages: true });
      const res = await axiosInstance.get("/admin/all-messages");
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoadingMessages: false });
    }
  },

  getEvents: async () => {
    set({ isEventsLoading: true });
    try {
      const res = await axiosInstance.get("/event/all-events");
      set({ events: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isEventsLoading: false });
    }
  },

  getMembers: async () => {
    set({ isMembersLoading: true });
    try {
      const res = await axiosInstance.get("/client/all-members");
      set({ members: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMembersLoading: false });
    }
  },

  getAdminRequests: async () => {
    try {
      const res = await axiosInstance.get("/admin/requests");
      set({ requests: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
      set({ requests: [] }); // ✅ Fallback to empty array on error
    }
  },

  approveRequest: async (id) => {
    try {
      set({ isApproving: true });

      const res = await axiosInstance.put(`/admin/update-request/${id}`, {
        status: true, // Explicitly approving the request
      });

      // ✅ Refresh the requests list after approval
      set((state) => ({
        requests: state.requests.filter((req) => req._id !== id),
      }));

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isApproving: false });
    }
  },

  denyRequest: async (id) => {
    try {
      set({ isDenying: true });

      const res = await axiosInstance.put(`/admin/update-request/${id}`, {
        status: false, // Denying the request
      });
      // ✅ Refresh the requests list after denial
      set((state) => ({
        requests: state.requests.filter((req) => req._id !== id),
      }));

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isDenying: false });
    }
  },

  // Add a new member
  addMember: async (memberData) => {
    try {
      set({ isAddingMember: true });
      const res = await axiosInstance.post("/admin/add-member", memberData);
      set((state) => ({ members: [...state.members, res.data] }));
      toast.success("Member added successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add member");
    } finally {
      set({ isAddingMember: false });
    }
  },

  //delete member
  deleteMember: async (id) => {
    try {
      set({ isDeletingMember: true });
      const res = await axiosInstance.delete(`/admin/delete-member/${id}`);
      set((state) => ({
        members: state.members.filter((member) => member._id !== id),
      }));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete member");
    } finally {
      set({ isDeletingMember: false });
    }
  },

  // Create a new event
  createEvent: async (eventData) => {
    try {
      set({ isCreatingEvent: true });
      const res = await axiosInstance.post("/admin/create-event", eventData);
      set((state) => ({ events: [...state.events, res.data] }));
      toast.success("Event created successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create event");
    } finally {
      set({ isCreatingEvent: false });
    }
  },

  //delete member
  deleteEvent: async (id) => {
    try {
      set({ isDeletingEvent: true });
      const res = await axiosInstance.delete(`/admin/delete-event/${id}`);
      set((state) => ({
        events: state.events.filter((event) => event._id !== id),
      }));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete member");
    } finally {
      set({ isDeletingEvent: false });
    }
  },

  // Update event status
  updateEventStatus: async (eventId, status) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.put(`/admin/update-status/${eventId}`, {
        status,
      });
      set((state) => ({
        events: state.events.map((event) =>
          event._id === eventId
            ? { ...event, status: res.data.event.status }
            : event
        ),
      }));
      toast.success("Event status updated!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    } finally {
      set({ isLoading: false });
    }
  },

  // Get all awards
  getAwards: async () => {
    try {
      set({ isLoadingAward: true });
      const res = await axiosInstance.get("/admin/all-awards");
      set({ awards: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch awards");
      set({ awards: [] }); // Fallback to empty array on error
    } finally {
      set({ isLoadingAward: false });
    }
  },

  // Add a new award
  addAward: async (awardData) => {
    try {
      set({ isAddingAward: true });
      const res = await axiosInstance.post("/admin/add-award", awardData);
      set((state) => ({ awards: [...state.awards, res.data.award] }));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add award");
    } finally {
      set({ isAddingAward: false });
    }
  },

  // Delete an award
  deleteAward: async (id) => {
    try {
      set({ isDeletingAward: true });
      const res = await axiosInstance.delete(`/admin/delete-award/${id}`);
      set((state) => ({
        awards: state.awards.filter((award) => award._id !== id),
      }));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete award");
    } finally {
      set({ isDeletingAward: false });
    }
  },

  // Get all partners
  getPartners: async () => {
    try {
      set({ isLoadingPartner: true });
      const res = await axiosInstance.get("/admin/all-partner");
      set({ partners: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch partners");
    } finally {
      set({ isLoadingPartner: false });
    }
  },

  // Add a new partner
  addPartner: async (partnerData) => {
    try {
      set({ isAddingPartner: true });
      const res = await axiosInstance.post("/admin/add-partner", partnerData);
      set((state) => ({ partners: [...state.partners, res.data.partner] }));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add partner");
    } finally {
      set({ isAddingPartner: false });
    }
  },

  // Delete partner
  deletePartner: async (id) => {
    try {
      set({ isDeletingPartner: true });
      const res = await axiosInstance.delete(`/admin/delete-partner/${id}`);
      set((state) => ({
        partners: state.partners.filter((partner) => partner._id !== id),
      }));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete partner");
    } finally {
      set({ isDeletingPartner: false });
    }
  },
}));
