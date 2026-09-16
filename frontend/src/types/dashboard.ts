import type { Incident } from "./incident";

export interface DashboardResponse {

    total_incidents: number;

    critical: number;

    high: number;

    medium: number;

    low: number;

    average_risk_score: number;

    highest_risk_score: number;

    recent: Incident[];
}