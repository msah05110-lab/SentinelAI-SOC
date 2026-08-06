import api from "../api/api";
import { Incident } from "../types/incident";

export async function getIncidents(): Promise<Incident[]> {
  const response = await api.get("/incidents");
  return response.data;
}