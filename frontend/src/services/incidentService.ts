import api from "../api/api";

import type { Incident } from "../types/incident";


// ============================================================
// DEFAULT IOC STRUCTURE
// ============================================================

const emptyIOCs = {
    ips: [],
    domains: [],
    urls: [],
    emails: [],
    md5: [],
    sha1: [],
    sha256: [],
};


// ============================================================
// NORMALIZE INCIDENT
// ============================================================

function normalizeIncident(
    incident: Incident
): Incident {

    return {
        ...incident,

        iocs:
            incident.iocs ??
            emptyIOCs,

        threats:
            incident.threats ??
            [],

        mitre:
            incident.mitre ??
            [],

        recommendations:
            incident.recommendations ??
            [],
    };
}


// ============================================================
// GET ALL INCIDENTS
// ============================================================

export async function getIncidents():
    Promise<Incident[]> {

    const response =
        await api.get("/incidents");

    return response.data.map(
        (incident: Incident) =>
            normalizeIncident(incident)
    );
}


// ============================================================
// GET SINGLE INCIDENT
// ============================================================

export async function getIncident(
    id: number
): Promise<Incident> {

    const response =
        await api.get(
            `/incidents/${id}`
        );

    return normalizeIncident(
        response.data.incident
    );
}


// ============================================================
// DELETE INCIDENT
// ============================================================

export async function deleteIncident(
    id: number
): Promise<void> {

    await api.delete(
        `/incidents/${id}`
    );
}


// ============================================================
// ANALYZE SECURITY LOG
// ============================================================

export async function analyzeIncident(
    file: File
) {

    const formData =
        new FormData();

    formData.append(
        "file",
        file
    );

    /*
     * IMPORTANT:
     * Do not manually set Content-Type here.
     * Browser/Axios must generate:
     *
     * multipart/form-data;
     * boundary=....
     */

    const response =
        await api.post(
            "/incidents/analyze",
            formData
        );

    return response.data;
}


// ============================================================
// GENERATE INCIDENT PDF REPORT
// ============================================================

export async function generateIncidentReport(
    id: number
): Promise<void> {

    const response =
        await api.post(
            `/incidents/report/${id}`,
            {},
            {
                responseType:
                    "blob",
            }
        );

    const blob =
        new Blob(
            [response.data],
            {
                type:
                    "application/pdf",
            }
        );

    const url =
        window.URL.createObjectURL(
            blob
        );

    const link =
        document.createElement(
            "a"
        );

    link.href = url;

    link.download =
        `incident_${id}_report.pdf`;

    document.body.appendChild(
        link
    );

    link.click();

    link.remove();

    window.URL.revokeObjectURL(
        url
    );
}