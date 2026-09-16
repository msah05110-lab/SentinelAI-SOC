import api from "../api/api";


// ============================================================
// LOGIN
// ============================================================

export async function login(
    email: string,
    password: string
) {

    const response =
        await api.post(
            "/auth/login",
            {
                email,
                password,
            }
        );

    return response.data;
}


// ============================================================
// REGISTER
// ============================================================

export interface RegisterData {
    full_name: string;
    email: string;
    password: string;
}


export async function register(
    data: RegisterData
) {

    const response =
        await api.post(
            "/auth/register",
            data
        );

    return response.data;
}


// ============================================================
// CURRENT USER
// ============================================================

export async function getCurrentUser() {

    const response =
        await api.get(
            "/auth/me"
        );

    return response.data;
}