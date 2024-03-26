import { API_URL } from "../../auth/constans";

interface Evento {
    Nombre_Evento: string;
    Descripcion: string;
    Fecha_Hora: Date;
    Ubicacion: string;
    Creador_Evento: number;
}

export const listEvents = async () => {
    return await  fetch (`${API_URL}/api/eventos`)
};
export const getEvento = async (idEventos: number) => {
    return await  fetch (`${API_URL}/api/eventos/${idEventos}`)
};
export const registerEvents = async (newEventos: Evento) => {
    return await  fetch(`${API_URL}/api/eventos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
                "Nombre_Evento":String(newEventos.Nombre_Evento).trim(),
                "Descripcion":String(newEventos.Descripcion).trim(),
                "Fecha_Hora": newEventos.Fecha_Hora.toISOString(),
                "Ubicacion":String(newEventos.Ubicacion).trim(),
                "Creador_Evento":newEventos.Creador_Evento
            }),
        });
};
export const updateEvento = async (eventoid:number,updateEvento: Evento) => {
    if (typeof updateEvento.Fecha_Hora === 'string') {
        updateEvento.Fecha_Hora = new Date(updateEvento.Fecha_Hora);
        }
      // Ahora puedes llamar a toISOString de manera segura
    const fechaISO = updateEvento.Fecha_Hora.toISOString();
    return await  fetch(`${API_URL}/api/eventos/${eventoid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
                "Nombre_Evento":String(updateEvento.Nombre_Evento).trim(),
                "Descripcion":String(updateEvento.Descripcion).trim(),
                "Fecha_Hora": fechaISO,
                "Ubicacion":String(updateEvento.Ubicacion).trim(),
                "Creador_Evento":updateEvento.Creador_Evento
            }),
        });
};
export const deleteEvents = async (idEventos: number) => {
    return await  fetch(`${API_URL}/api/eventos/${idEventos}`, {
        method: "DELETE"
        });
};