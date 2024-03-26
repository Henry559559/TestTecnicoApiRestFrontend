import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import DefaultLayout from "../layout/DefaultLayout";
import React, {useState} from "react";
import { API_URL } from "../auth/constans";
import { AuthResponseError } from "../types/types";

export default function Signup(){
    const [Nombre, setNombre] = useState("");
    const [Correo_Electronico, setCorreo_Electronico] = useState("");
    const [password, setPassword] = useState("");
    const [errorResponse, setErrorResponse] = useState("");
    const goTo =useNavigate();
    const auth = useAuth();


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        try {
            setErrorResponse("");
            if (!Nombre || !Correo_Electronico || !password) {
              // Establecemos el mensaje de error
                setErrorResponse("Todos los campos son obligatorios.");
                return;
            }
            const response = await fetch(`${API_URL}/api/usuarios`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Nombre, Correo_Electronico, password }),
                });
                if (!response.ok) {
                const errorData = (await response.json()) as AuthResponseError;
                console.error('Error en la respuesta:', errorData);
                setErrorResponse(errorData.body.error)
                return;
                }
                console.log("Usuario creado con éxito");
                setErrorResponse("");
                goTo("/");
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
                    <h1 className="mb-3 text-center">Signup</h1>
                    {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
                    <label className="form-label">Name</label>
                    <input type="text" name="name" value={Nombre}  onChange={(e) => setNombre(e.target.value)} className="form-control" autoFocus required/>

                    <label className="form-label">Correo Electronico</label>
                    <input type="text" name="username" value={Correo_Electronico}  onChange={(e) => setCorreo_Electronico(e.target.value)} className="form-control" autoFocus required/>

                    <label className="form-label">Password</label>
                    <input type="password"  name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" autoFocus required/>
                    <div className="d-grid gap-2">
                        <button className="btn btn-block btn-primary">Create User</button>
                    </div>
                </form>
            </div>
        </DefaultLayout>
    ) 
}