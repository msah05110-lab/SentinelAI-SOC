export interface IncidentIOC {
    ips: string[];
    domains: string[];
    urls: string[];
    emails: string[];
    md5: string[];
    sha1: string[];
    sha256: string[];
}


export interface MITRETechnique {
    id: string;
    name: string;
    tactic: string;
}


export interface ThreatIntel {
    provider?: string;
    indicator?: string;
    status?: string;

    [key: string]: unknown;
}


export interface Incident {
    id: number;

    filename: string;

    severity: string;

    risk_score: number;

    ai_summary: string | null;

    created_at: string;

    iocs?: IncidentIOC | null;

    threats?: ThreatIntel[] | null;

    mitre?: MITRETechnique[] | null;

    recommendations?: string[] | null;
}