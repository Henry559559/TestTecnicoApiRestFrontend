import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import DefaultLayout from "../layout/DefaultLayout"
import type { AuthResponse, AuthResponseError } from "../types/types";
import {useState} from "react";
import { API_URL } from "../auth/constans";

export default function login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorResponse, setErrorResponse] = useState("");
    const auth = useAuth();
    const goTo = useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        try {
            setErrorResponse("");
            if ( !email || !password) {
              // Establecemos el mensaje de error
                setErrorResponse("Todos los campos son obligatorios.");
                return;
            }
            const response = await fetch(`${API_URL}/auth-token/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                });
                if (!response.ok) {
                const errorData = (await response.json()) as AuthResponseError;
                console.error('Error en la respuesta:', errorData);
                setErrorResponse(errorData.body.error)
                return;
                }
                setErrorResponse("");
                const json = (await response.json()) as AuthResponse;
                
                console.log(json);
                if (json.jwt) {
                    auth.saveUser(json);
                    console.log(auth.isAuthenticated);
                }
            } catch (error) {
                console.error('Hubo un problema con la petición Fetch:', error);
            }
    }
    if (auth.isAuthenticated) {
        return <Navigate to="/Dashboard" />
    }
    return(
        
            <DefaultLayout>
                <div className="col-md-3 mx-auto">
                    <form className="form" onSubmit={handleSubmit}>
                        <h1 className="mb-3 text-center">Login</h1>
                        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
                        <label className="form-label">Correo Electronico</label>
                        <input type="text" value={email}  onChange={(e) => setEmail(e.target.value)} className="form-control" autoFocus required/>
                        <label className="form-label">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" autoFocus required/>
                        <div className="d-grid gap-2">
                            <button className="btn btn-block btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </DefaultLayout>
        ) 
}