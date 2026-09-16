import api from "../api/api";

export interface HistoryIncident {
    id: number;
    filename: string;
    severity: string;
    ai_summary: string | null;
    created_at: string;
}

interface HistoryListResponse {
    incidents: HistoryIncident[];
}


// ============================================================
// GET HISTORY
// ============================================================

export async function getHistory(): Promise<
    HistoryIncident[]
> {
    const response =
        await api.get<HistoryListResponse>(
            "/history"
        );

    return response.data.incidents;
}


// ============================================================
// DELETE HISTORY INCIDENT
// ============================================================

export async function deleteHistoryIncident(
    id: number
): Promise<void> {

    await api.delete(
        `/history/${id}`
    );
}