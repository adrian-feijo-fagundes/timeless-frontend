import { executeWithErrorHandling } from "@/utils/executeWithErrorHandling";
import api from "./api";

/* ---------------------------
    TYPES DO FRONTEND
---------------------------- */

// Dados para criar task
export interface CreateTaskData {
    title: string;
    topic?: string;
    status: string;
    description?: string;
    limitDate?: Date | null;
    groupId: number;
}

// Dados para atualizar
export interface UpdateTaskData {
    title?: string;
    topic?: string;
    status?: string;
    limitDate?: Date | null;
    completedAt?: string | null;
    completedLate?: boolean;
    groupId?: number;   
}

// Task enviada pelo backend
export interface TaskResponse {
    id: number;
    title: string;
    topic: string;
    status: string;
    description?: string | null;
    limitDate?: string | null;
    createdAt: string;
    updatedAt: string;
    completedAt?: string | null;
    completedLate?: boolean;
    userId: number;
    // Antes era apenas groupId, agora incluímos o objeto completo
    group?: {
        id: number;
        name: string;
        description?: string | null;
        color?: string | null;
        createdAt?: Date;
        updatedAt?: Date;
    } | null;
}

/* -----------------------------------------------------
    CREATE TASK
----------------------------------------------------- */
export async function createTask(data: CreateTaskData): Promise<TaskResponse> {
    return executeWithErrorHandling(async () => { 
        const response = await api.post<TaskResponse>("/task", data);
        return response.data;
    }, "Erro ao criar tarefa");
}

/* -----------------------------------------------------
    LIST TASKS (todas do usuário)
----------------------------------------------------- */
export async function listTasks(): Promise<TaskResponse[]> {
    return executeWithErrorHandling(async () => { 
        const response = await api.get<TaskResponse[]>("/task");
        return response.data;
    }, "Erro ao listar tarefas");
}

/* -----------------------------------------------------
    GET TASK BY ID
----------------------------------------------------- */
export async function getTaskById(id: number): Promise<TaskResponse> {
    return executeWithErrorHandling(async () => {
        const response = await api.get<TaskResponse>(`/task/${id}`);
        return response.data;
    }, "Erro ao buscar tarefa");
}

/* -----------------------------------------------------
    LIST TASKS BY GROUP
----------------------------------------------------- */
export async function listTasksByGroup(groupId: number): Promise<TaskResponse[]> {
    return executeWithErrorHandling(async () => {
        const response = await api.get<TaskResponse[]>(`/group/${groupId}/task`);
        return response.data;
    }, "Erro ao buscar tarefas do grupo");
}

/* -----------------------------------------------------
    UPDATE TASK
----------------------------------------------------- */
export async function updateTask(id: number, data: UpdateTaskData): Promise<TaskResponse> {
    return executeWithErrorHandling(async () => {
        const response = await api.put<TaskResponse>(`/task/${id}`, data);
        return response.data;
    },"Erro ao atualizar tarefa");
}

/* -----------------------------------------------------
    DELETE TASK
----------------------------------------------------- */
export async function deleteTask(id: number): Promise<boolean> {
    return executeWithErrorHandling(async () => { 
        await api.delete(`/task/${id}`);
        return true;
    },"Erro ao remover tarefa");
}
