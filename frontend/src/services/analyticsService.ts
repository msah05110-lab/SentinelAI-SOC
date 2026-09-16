import api from "../api/api";


// ============================================================
// TYPES
// ============================================================

export interface AnalyticsSummary {
    total: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
}


export interface AnalyticsTrendItem {
    id: number;
    filename: string;
    severity: string;
    created_at: string;
}


export interface AnalyticsTrendResponse {
    incidents: AnalyticsTrendItem[];
}


export interface SeverityDistribution {
    critical: number;
    high: number;
    medium: number;
    low: number;
}


// ============================================================
// SUMMARY
// ============================================================

export async function getAnalyticsSummary(): Promise<
    AnalyticsSummary
> {

    const response =
        await api.get<AnalyticsSummary>(
            "/analytics/summary"
        );

    return response.data;
}


// ============================================================
// RECENT INCIDENTS
// ============================================================

export async function getAnalyticsRecent(): Promise<
    AnalyticsTrendItem[]
> {

    const response =
        await api.get<AnalyticsTrendResponse>(
            "/analytics/recent"
        );

    return response.data.incidents;
}


// ============================================================
// SEVERITY DISTRIBUTION
// ============================================================

export async function getSeverityDistribution(): Promise<
    SeverityDistribution
> {

    const response =
        await api.get<SeverityDistribution>(
            "/analytics/severity"
        );

    return response.data;
}