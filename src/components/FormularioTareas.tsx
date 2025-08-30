import React, { useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import { agregarTarea } from "../redux/tareaSlice";
import "./FormularioTareas.css"

const FormularioTareas: React.FC = () => {
    const dispatch = useAppDispatch()
    const [nuevoTextoTarea, setNuevoTextoTarea] = useState<string>("")

    const handleCrearTarea = () => {
        dispatch(agregarTarea(nuevoTextoTarea))
        setNuevoTextoTarea("")
    }
    
    return (
        <div className="formulario_container">
            <input type="text" value={nuevoTextoTarea} onChange={(e) => setNuevoTextoTarea(e.target.value)} autoFocus={true} placeholder="Agregar una nueva tarea" />
            <button onClick={handleCrearTarea}>Agregar Tarea</button> 
        </div>
    )
}

export default FormularioTareas
