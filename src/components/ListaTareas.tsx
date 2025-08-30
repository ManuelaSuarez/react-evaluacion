import { useAppSelector, useAppDispatch } from '../hooks/redux.ts'
import {
    eliminarTarea,
    iniciarEdicion,
    actualizarTextoEditado,
    actualizarEstadoEditado,
    guardarEdicion
} from "../redux/tareaSlice.ts"
import type { iTareaTypes } from "../tarea.ts"
import FormularioTareas from './FormularioTareas.tsx'
import "./ListaTareas.css"
import { FaEdit, FaCheck } from "react-icons/fa"
import { RiDeleteBin5Fill } from "react-icons/ri"

const ListaTareas = () => {
    const { tareas, idEditado, textoEditado, estadoEditado } = useAppSelector((state) => state.tareas)
    const dispatch = useAppDispatch()

    const handleEdicion = (id: number, texto: string, estado: iTareaTypes["estado"]) => {
        dispatch(iniciarEdicion({ id, texto, estado }))
    }

    const handleGuardarEdicion = () => {
        dispatch(guardarEdicion())
    }

    const handleEliminar = (id: number) => {
        dispatch(eliminarTarea(id))
    }

    return (
        <div className='lista_container'>
            <div>
                <FormularioTareas />
            </div>
            <div className='tareas'>
                {tareas.map((t) => (
                    <div className='items' key={t.id}>
                        {idEditado == t.id ? (
                            <div className='editando'>
                                <input type="text" value={textoEditado} onChange={(e) => dispatch(actualizarTextoEditado(e.target.value))} autoFocus={true} />
                                <select value={estadoEditado} onChange={(e) => dispatch(actualizarEstadoEditado(e.target.value as iTareaTypes["estado"]))}>
                                    <option value="En proceso...">En proceso...</option>
                                    <option value="Completada">Completada</option>
                                </select>
                                <button onClick={() => handleGuardarEdicion()}><FaCheck /></button>
                            </div>
                        ) : (
                            <div className='noEditando'>
                                <span>{t.texto}</span>
                                <span>({t.estado})</span>
                                <button onClick={() => handleEdicion(t.id, t.texto, t.estado)}><FaEdit /></button>
                            </div>
                        )}
                        <button onClick={() => handleEliminar(t.id)}><RiDeleteBin5Fill /></button>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default ListaTareas
