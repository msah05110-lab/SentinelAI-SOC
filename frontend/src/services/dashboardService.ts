import api from "../api/api";
import { DashboardResponse } from "../types/dashboard";

export async function getDashboard(): Promise<DashboardResponse> {
  const response = await api.get("/dashboard");
  return response.data;
}