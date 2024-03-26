    export interface AuthResponse {
            jwt: string;
    }
    export interface AuthResponseError {
        body: {
            error: string;
        };
    }
    
    export interface User {
        ID_Usuario: string;
        Nombre: string;
        Correo_Electronico: string;
    }
    
    export interface AccessTokenResponse {
        statusCode: number;
        body: {
        accessToken: string;
        };
        error?: string;
    }