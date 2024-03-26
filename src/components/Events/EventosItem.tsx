
import * as EventosServer from "./Eventoserver";
import { useNavigate, useParams} from "react-router-dom";
interface EventosItemProps {
    id_Evento: number;
    Nombre_Evento: string;
    Descripcion: string;
    Fecha_Hora:  Date;
    Ubicacion: string;
    listCompanies: () => Promise<void>;
    // ... otras propiedades
}
const EventosItem = ({ id_Evento, Nombre_Evento, Descripcion, Fecha_Hora, Ubicacion,listCompanies}: EventosItemProps) => {
        const navigate = useNavigate();
        const params = useParams();
        console.log(params);
        
     // Formatear la fecha para mostrar solo el día, mes y año
        const fecha = new Date(Fecha_Hora);

     // Ahora puedes usar toLocaleDateString para formatear la fecha
        const fechaFormateada = fecha.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
        });
        const handleDelete = async (eventoId:number) =>{
            await EventosServer.deleteEvents(eventoId);
            listCompanies();
        }
    return (
            <div className="col-md-4 mb-4">
                <div className="card card-body">
                    <h3 className="card-title">{Nombre_Evento} <button onClick={() => navigate(`/eventoUpdate/${id_Evento}`)} className="btn btn-info btn-sm"
                    style={{ fontSize: '12px', textAlign: 'center', padding: '5px 10px' }}>Actualizar</button></h3>
                    <samp>Dia Del Evento: <br></br> <strong>{fechaFormateada}</strong></samp>
                    <samp>Ubicacion Del Evento: <br></br> <strong>{Ubicacion}</strong></samp>
                    <div className="form-floating">
                        <textarea className="form-control" style={{height: '100px'}} value={Descripcion} id="floatingTextarea"></textarea>
                        <label htmlFor="floatingTextarea">Descripcion Del Evento: </label>
                    </div>
                    <button onClick={()=>id_Evento && handleDelete(id_Evento)} className="btn btn-warning my-2">Eliminar Evento</button>
                </div>
            </div>
    )
};

export default EventosItem;