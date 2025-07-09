import { AxiosResponse } from "axios";
import { axiosInstance } from "@/lib";
import { create } from "zustand";
import { addToast } from "@heroui/toast";

interface DashboardState {
  getData: () => Promise<any>;
  getFilteredData: (filters?: {
    session?: string;
    year?: string;
    school?: string;
    startDate?: string;
    endDate?: string;
  }) => Promise<any>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  getData: async () => {
    try {
      const response = await axiosInstance.get("/api/v1/dashboard/data");
      if (response.status !== 200) {
        addToast({
          title: "Failed to fetch data. Please try again.",
          color: "danger",
        });
        throw new Error("Failed to fetch dashboard data");
      }

      addToast({
        title: "Data updated successfully.",
        color: "success",
      });

      return response.data;
    } catch (err) {
      addToast({
        title: "Failed to fetch data. Please try again.",
        color: "danger",
      });
      return null;
    }
  },

  getFilteredData: async (filters = {}) => {
    try {
      const { session, year, school, startDate, endDate } = filters;
      const params: any = {};

      if (session) params.session = session;
      if (year) params.year = year;
      if (school) params.school = school;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const response = await axiosInstance.get("/api/v1/dashboard/filterData", {
        params,
      });

      if (response.status !== 200) {
        addToast({
          title: "Failed to fetch data. Please try again.",
          color: "danger",
        });
        throw new Error("Failed to fetch dashboard data");
      }

      addToast({
        title: "Data updated successfully.",
        color: "success",
      });

      return response.data;
    } catch (err) {
      addToast({
        title: "Failed to fetch data. Please try again.",
        color: "danger",
      });

      return null;
    }
  },
}));
