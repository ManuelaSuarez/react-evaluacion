import React, { type Dispatch, useState, type SetStateAction } from "react";
import TareaService from "../TareaService";
import type { iTareaTypes } from "../tarea";

interface iPropTypes {
    setTareas: Dispatch<SetStateAction<iTareaTypes[]>>
}

const FormularioTareas: React.FC<iPropTypes> = ({setTareas}) => {
   
    const [nuevoTextoTarea, setNuevoTextoTarea] = useState<string>("")

    const handleCrearTarea = () => {
        if(nuevoTextoTarea.trim() != "") {
            const nuevaTarea = TareaService.crearTarea(nuevoTextoTarea);
            setTareas((listaDesactualizada) => [...listaDesactualizada, nuevaTarea]);
            setNuevoTextoTarea("");
        }
    }
    
    return (
        <div>
            <form action="submit">
                <input type="text" value={nuevoTextoTarea} onChange={(e) => setNuevoTextoTarea(e.target.value)} autoFocus={true} placeholder="Agregar una nueva tarea" />
                <button onClick={handleCrearTarea}>Crear</button>
            </form>  
        </div>
    )
}

export default FormularioTareas
