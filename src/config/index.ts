export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const config = {
    API_AUTHENTICATION_URL: `${API_BASE_URL}/auth/${import.meta.env.VITE_PROJECT_ID}`,
    API_DATABASE_URL: `${API_BASE_URL}/database/${import.meta.env.VITE_PROJECT_ID}`,
}

export default config;