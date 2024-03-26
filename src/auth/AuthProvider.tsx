import { useContext, createContext, useState, useEffect } from "react";
import type { AuthResponse } from "../types/types";
import { API_URL } from "./constans";
// import type { AuthResponse, User } from "../types/types";
// import requestNewAccessToken from "./requestNewAccessToken";
// import { API_URL } from "./authConstants";

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext({
    isAuthenticated: false,
    getAccessToken: () => {},
    saveUser: (userData: AuthResponse) => {},
});

export function AuthProvider({children}: AuthProviderProps){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken]= useState<string>("");

    // Esta función se ejecuta cuando se carga el componente
    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
            const response = await fetch(`${API_URL}/auth-token/profile`, {
                method: "GET",
                headers: {
                Authorization: `Bearer ${token}`,
                'Cache-Control': 'no-cache'
                }
            });
            if (response.ok) {
                const json = await response.json();
                setIsAuthenticated(true);
                console.log(json);
                return json.body;
            }
            }
        };
        verifyToken();
}, []);// El array vacío significa que esta función se ejecutará solo una vez después de la primera renderización

    function getAccessToken(){
        return accessToken;
    }
    function saveUser(userData:AuthResponse){
        setAccessToken(userData.jwt);
        localStorage.setItem("accessToken",userData.jwt);
        setIsAuthenticated(true)
    }
    return (
        <AuthContext.Provider value={{isAuthenticated, getAccessToken, saveUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);