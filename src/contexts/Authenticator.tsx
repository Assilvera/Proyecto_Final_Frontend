import { createContext, useEffect, useState }from "react";
import axios from "axios";
import config from "../config";

export const AuthenticatorContext = createContext({
    isAuthenticated: false,
    login: ({ email, password }: { email: string, password: string }) => { },
    logout: () => { },
    loading: true
});


export const AuthenticatorProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = ({ email, password }: { email: string, password: string }) => {
        axios.post(config.API_AUTHENTICATION_URL + "/login", {
            email,
            password
        })
        .then(response => {
            setIsAuthenticated(true);
            localStorage.setItem("token", response.data.accessToken);
        })
        .catch(error => {
            console.error(error);
        });
    };

    const logout = async () => {
        setIsAuthenticated(false);
        await axios.post(config.API_AUTHENTICATION_URL + '/logout', null, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        localStorage.removeItem("token");
    }

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get(config.API_AUTHENTICATION_URL + "/verify-token", {
                    headers: { Authorization: `Bearer ${token}` },
                    validateStatus: (status) => status < 500
                });
                
                setIsAuthenticated(res.status === 200);
            } catch (error) {
                console.error('Error verifying token:', error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);
    
    return (
        <AuthenticatorContext.Provider value={{ isAuthenticated, login, logout, loading }}>
            {children}
        </AuthenticatorContext.Provider>
    );
};

