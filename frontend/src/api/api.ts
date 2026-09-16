import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1",
});

// ============================================================
// JWT INTERCEPTOR
// ============================================================

api.interceptors.request.use(
    (config) => {

        const token =
            localStorage.getItem(
                "access_token"
            );

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;

        }

        /*
         * Do NOT force Content-Type globally.
         *
         * Axios/browser will automatically use:
         * - application/json for normal JSON requests
         * - multipart/form-data + boundary for FormData
         */

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

export default api;