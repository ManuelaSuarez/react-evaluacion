import {useState} from 'react'
import type { iTareaTypes } from "../tarea.ts"
import TareaService from "../TareaService"
import FormularioTareas from './FormularioTareas.tsx'


const ListaTareas = () => {
    // Estados
    const [tareas, setTareas] = useState<iTareaTypes[]>(TareaService.leerTareas());
    const [idEditado, setIdEditada] = useState<number | null>(null);
    const [textoEditado, setTextoEditado] = useState<string>("");
    const [estadoEditado, setEstadoEditado] = useState<iTareaTypes["estado"]>("En proceso...");

    // Handlers
    const handleEdicion = (id: number, texto: string, estado: iTareaTypes["estado"]) => {
        setIdEditada(id);
        setTextoEditado(texto);
        setEstadoEditado(estado);
    }

    const handleGuardarEdicion = (id: number) => {
        if(textoEditado.trim()!= "") {
            const actualizarTarea = TareaService.editarTarea({
                id,
                texto: textoEditado,
                estado: estadoEditado
            });

            setTareas((listaDesactualizada) => listaDesactualizada.map((t) => (t.id === id ? actualizarTarea : t)));

            setIdEditada(null);
            setTextoEditado("");
            setEstadoEditado("En proceso...");
        }
    }

    const handleEliminar = (id: number) => {
        TareaService.borrarTarea(id);
        setTareas((listaDesactualizada) => listaDesactualizada.filter((t) => t.id !== id))
    }

    return (
        <div className='listaTareasContenedor'>
            <div>
                <h2>¿Desea agregar una nueva tarea?</h2>
                <FormularioTareas setTareas={setTareas} />
            </div>

            {tareas.map((t) => (
                <div className='itemTarea' key={t.id}>
                    {idEditado == t.id ? (
                        <div>
                            <input type="text" value={textoEditado} onChange={(e) => setTextoEditado(e.target.value)} autoFocus={true} />
                            <select value={estadoEditado} onChange={(e) => setEstadoEditado(e.target.value as iTareaTypes["estado"])}>
                                <option value="En proceso...">En proceso...</option>
                                <option value="Completada">Completada</option>
                            </select>
                            <button onClick={() => handleGuardarEdicion(t.id)}>Guardar</button>
                        </div>
                    ) : (
                        <div>
                            <span>{t.texto}</span>
                            <span>({t.estado})</span>
                            <button onClick={() => handleEdicion(t.id, t.texto, t.estado)}>Editar</button>
                        </div>
                    )}

                    <button onClick={() => handleEliminar(t.id)}>Eliminar</button>
                </div>
            ))}
        </div>
    )
}

export default ListaTareas
