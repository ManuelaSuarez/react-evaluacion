import type { iTareaTypes } from "./tarea";

const LOCAL_STORAGE_KEY = 'tereas';

const TareaService = {
    // Read
    leerTareas: (): iTareaTypes[] => {
        const tareaStr = localStorage.getItem(LOCAL_STORAGE_KEY)
        return tareaStr? JSON.parse(tareaStr): []
    },

    // Create
    crearTarea: (texto: string): iTareaTypes => {
        const tareas = TareaService.leerTareas();
        const nuevaTarea: iTareaTypes = {id: tareas.length +1, texto, estado: "En proceso..."};

        // Actualizar arreglo de tareas con la nueva tarea
        const actualizarListaTareas = [...tareas, nuevaTarea];

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(actualizarListaTareas))
        return nuevaTarea;
    },

    // Update
    editarTarea: (tarea: iTareaTypes): iTareaTypes => {
        const tareas = TareaService.leerTareas();
        const actualizarTarea = tareas.map((t) => (t.id === tarea.id? tarea : t));

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(actualizarTarea));

        return tarea;
    },

    // Delete
    borrarTarea: (id: number): void => {
        const tareas = TareaService.leerTareas();
        const actualizarListaTareas = tareas.filter((t) => t.id !== id)

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(actualizarListaTareas));
    }
}

export default TareaService