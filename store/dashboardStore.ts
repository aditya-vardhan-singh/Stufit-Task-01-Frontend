import { AxiosResponse } from "axios";
import { axiosInstance } from "@/lib";
import { create } from "zustand";

interface DashboardState {
  getData: () => Promise<AxiosResponse>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  getData: async () => {
    return axiosInstance.get("/api/v1/dashboard/data");
  },
}));
