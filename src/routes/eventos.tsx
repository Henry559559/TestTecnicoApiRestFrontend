import React, { useEffect, useState } from 'react';
import PortalLayout from '../layout/PortalLayout';
import  * as EventoServer from '../components/Events/Eventoserver';
import EventoItem from './../components/Events/EventosItem';
// Supongamos que esta es la tabla que quieres mostrar en el modal

// Definir la interfaz para los objetos de compañía
interface Company {
    id_Evento: number;
    Nombre_Evento: string;
    Descripcion: string;
    Fecha_Hora: Date;
    Ubicacion: string;
    listCompanies: () => Promise<void>;
    // ... otras propiedades que esperas de tus compañías
}

export default function Eventos() {
    const [companiess, setCompanies] = useState<Company[]>([]);

    const listCompanies = async () => {
        try {
            const res = await EventoServer.listEvents();
            const datas = await res.json();
            // Asegúrate de que datas.companiess es un array de objetos Company
            if (Array.isArray(datas)) {
            setCompanies(datas);
            } else {
            console.log('datas.companiess no es un array:', datas);
            }
        } catch (error) {
            console.error('Error al obtener los eventos:', error);
        }
    };
    useEffect(()=>{
        listCompanies()
    },[]);
    return (
        <PortalLayout>
            <div className="dashboard">
                <h1>Eventos</h1>
                
                <div className="row">
                    {companiess.map((company) => (
                    <EventoItem key={company.id_Evento} {...company} listCompanies={listCompanies}/>
                ))}
                </div>
            </div>
        </PortalLayout>
    );
}