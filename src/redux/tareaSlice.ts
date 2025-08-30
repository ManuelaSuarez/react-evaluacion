import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { iTareaTypes } from "../tarea";
import TareaService from "../TareaService";

interface iTareaState {
    tareas: iTareaTypes[]
    idEditado: number | null
    textoEditado: string
    estadoEditado: iTareaTypes["estado"]
}

const initialState: iTareaState = {
    tareas: TareaService.leerTareas(),
    idEditado: null,
    textoEditado: "",
    estadoEditado: "En proceso..."
}

export const tareasSlice = createSlice({
    name: "tareas",
    initialState,
    reducers: {
        agregarTarea: (state, action: PayloadAction<string>) => {
            if(action.payload.trim() !== "") {
                const nuevaTarea = TareaService.crearTarea(action.payload);
                state.tareas.push(nuevaTarea);
            }
        },
        eliminarTarea: (state, action: PayloadAction<number>) => {
            TareaService.borrarTarea(action.payload);
            state.tareas = state.tareas.filter((t) => t.id !== action.payload)
        },
        iniciarEdicion: (state, action: PayloadAction<{id: number, texto: string, estado: iTareaTypes["estado"]}>) => {
            state.idEditado = action.payload.id;
            state.textoEditado = action.payload.texto;
            state.estadoEditado = action.payload.estado;
        },
        actualizarTextoEditado: (state, action: PayloadAction<string>) => {
            state.textoEditado = action.payload;
        },
        actualizarEstadoEditado: (state, action: PayloadAction<iTareaTypes["estado"]>) => {
            state.estadoEditado = action.payload;
        },
        guardarEdicion: (state) => {
            if(state.idEditado !== null && state.textoEditado.trim() !== "") {
                const tareaActualizada = TareaService.editarTarea({
                    id: state.idEditado,
                    texto: state.textoEditado,
                    estado: state.estadoEditado,
                })

                const index = state.tareas.findIndex((tarea) => tarea.id === state.idEditado)
                if (index !== -1) {
                    state.tareas[index] = tareaActualizada
                }

                state.tareas = TareaService.leerTareas()

                state.idEditado = null
                state.textoEditado = ""
                state.estadoEditado = "En proceso..."
            }
        },
        cancelarEdicion: (state) => {
            state.idEditado = null
            state.textoEditado = ""
            state.estadoEditado = "En proceso..."
        }
    } 
})

export const {
    agregarTarea,
    eliminarTarea,
    iniciarEdicion,
    actualizarTextoEditado,
    actualizarEstadoEditado,
    guardarEdicion,
    cancelarEdicion
} = tareasSlice.actions

export default tareasSlice.reducer