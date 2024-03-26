import { useEffect, useState } from "react";
import { useNavigate , useParams} from "react-router-dom";
import PortalLayout from "../../layout/PortalLayout";
import * as EventoServer from "./Eventoserver";
const EventosForm = () =>{
    const navigate = useNavigate();
    const params = useParams();
    const initialState = { Nombre_Evento: "", Descripcion: "", Fecha_Hora: new Date() , Ubicacion: "" , Creador_Evento:1};
    const [evento, setEvento] = useState(initialState);

    // Ahora puedes usar toLocaleDateString para formatear la fecha
    const fechaHora = new Date(evento.Fecha_Hora);
const fechaFormateada = `${fechaHora.getFullYear()}-${('0' + (fechaHora.getMonth() + 1)).slice(-2)}-${('0' + fechaHora.getDate()).slice(-2)}`;
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEvento({ ...evento, [name]: value });
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            let res;
            if (!params.id) {
                res = await EventoServer.registerEvents(evento);
                const data=await res.json();
                if(data.message==="Success"){
                    setEvento(initialState);
                }
            }else{
                await EventoServer.updateEvento(parseInt(params.id),evento)
            }
            navigate("/eventos");
        } catch (error) {
            console.log(error);
        }
    };
    const getEvento= async(eventoId:number)=>{
        try {
            const res = await EventoServer.getEvento(eventoId);
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
            // Asumiendo que quieres el primer objeto del arreglo
            setEvento(data[0]);
            } else {
            console.log('data no es un arreglo o está vacío:', data);
            }
        } catch (error) {
           console.log(error);
            
        }
    };
    useEffect(()=>{
        if (params.id) {
            getEvento(parseInt(params.id))
        }
    },[]);
    return (
        <PortalLayout>
            <div className="col-md-3 mx-auto">
                <h2 className="mb-3 text-center">Evento</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre Del Evento</label>
                        <input type="text" name="Nombre_Evento"  value={evento.Nombre_Evento} onChange={handleInputChange} className="form-control" autoFocus required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha Del evento</label>
                        <input type="date" name="Fecha_Hora"  value={fechaFormateada} onChange={handleInputChange} className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Ubicacion</label>
                        <input type="text" name="Ubicacion" value={evento.Ubicacion} onChange={handleInputChange} className="form-control"  required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Descripcion Del Evento</label>
                        <textarea  name="Descripcion" value={evento.Descripcion} onChange={handleInputChange} className="form-control"  required ></textarea>
                    </div>
                    <div className="d-grid gap-2">
                        {
                            params.id?(
                                <button type="submit" className="btn btn-outline-info">Actualizar</button>
                            ):(
                                <button type="submit" className="btn btn-info">Registrar</button>
                            )
                        }
                        
                    </div>
                </form>
            </div>
        </PortalLayout>
        );
}

export default EventosForm;