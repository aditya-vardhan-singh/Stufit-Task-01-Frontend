import { axiosInstance } from "@/lib";
import { addToast } from "@heroui/toast";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  checkAuth: () => Promise<boolean>;
  setLoggedIn: (value: boolean) => void;
  login: (data: { email: string; password: string }) => Promise<boolean>;
  logout: () => void;
}


export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,

  checkAuth: async () => {
    try {
      const cookie = Cookies.get("token");
      if (cookie) {
        set({ isLoggedIn: true });
        return true;
      } else {
        set({ isLoggedIn: false });
        return false;
      }
      // const storedUser = localStorage.getItem("authUser");
      // if (Cookies.get("token")) {
      //   return true;
      // }
      // if (storedUser) {
      //   set({ authUser: JSON.parse(storedUser), isCheckingAuth: false });
      //   return; // Skip API call if user is found in local storage
      // }
      // Only make a backend request if no stored user
      // const res = await axiosInstance.get<Omit<AuthUser, "password">>("/profile");
      // set({ authUser: res.data });
      // localStorage.setItem("authUser", JSON.stringify(res.data));
    } catch (error) {
      set({ isLoggedIn: false });
      return false;
      // set({ authUser: null });
      // localStorage.removeItem("authUser");
      // if (error instanceof AxiosError && error.response) {
      //   console.error("Error in checkAuth:", error.response.data);
      // }
    }
  },

  setLoggedIn: (value: boolean) => set({ isLoggedIn: value }),

  login: async (data: { email: string; password: string }) => {
    try {
      const res = await axiosInstance.post(`/api/v1/auth/login`, data);
      if (!res.data.token) {
        addToast({
          title: "Login failed. Please try again.",
          description: "No token received from the server.",
          color: "danger",
        });
        set({ isLoggedIn: false });
        return false;
      }
      Cookies.set("token", res.data.token!, { expires: 10, secure: true });
      addToast({
        title: res.data.message || "Login successful!",
        color: "success",
      });
      set({ isLoggedIn: true });
      return true;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        addToast({
          title: "Login failed. Please try again.",
          description: "Please check your credentials.",
          color: "danger",
        });
      }
      set({ isLoggedIn: false });
      return false;
    }
  },

  logout: () => {
    try {
      Cookies.remove("token");
      set({ isLoggedIn: false });
      addToast({
        title: "Logout successful!",
      });
    } catch (error) {
      addToast({
        title: "Logout failed. Please try again.",
        description: "An error occurred while logging out.",
        color: "danger",
      });
    }
  },
}));
