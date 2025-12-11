import { executeWithErrorHandling } from "@/utils/executeWithErrorHandling";
import api from "./api";

/* ---------------------------
    TYPES DO FRONTEND
---------------------------- */
export interface CreateGroupData {
    title: string;
    description?: string;
    days?: number[];
    maxTasksPerDay?: number;
}

export interface UpdateGroupData {
    title?: string;
    description?: string;
    days?: number[];
    maxTasksPerDay?: number;
}

export interface GroupResponse {
    id: number;
    title: string;
    description: string | null;
    maxTasksPerDay: number;
    days: number[];
    createdAt: string;
    updatedAt: string;
}

/* -----------------------------------------------------
    CREATE GROUP
----------------------------------------------------- */
export async function createGroup(data: CreateGroupData): Promise<GroupResponse> {
    return executeWithErrorHandling(async () => { 
        const response = await api.post<GroupResponse>("/groups", data);
        return response.data;
    }, "Erro ao criar grupo")
}

/* -----------------------------------------------------
    LIST GROUPS
----------------------------------------------------- */
export async function listGroups(): Promise<GroupResponse[]> {
    return executeWithErrorHandling(async () => { 
        const response = await api.get<GroupResponse[]>("/groups");
        return response.data;
    }, "Erro ao listar grupos")
}

/* -----------------------------------------------------
    GET GROUP BY ID
----------------------------------------------------- */
export async function getGroupById(id: number): Promise<GroupResponse> {
    return executeWithErrorHandling(async () => {
        const response = await api.get<GroupResponse>(`/groups/${id}`);
        return response.data;
    }, "Erro ao buscar grupo")
}

/* -----------------------------------------------------
UPDATE GROUP
----------------------------------------------------- */
export async function updateGroup(id: number, data: UpdateGroupData): Promise<GroupResponse> {
    return executeWithErrorHandling(async () => {
        const response = await api.put<GroupResponse>(`/groups/${id}`, data);
        return response.data;
    },"Erro ao atualizar grupo")
}

/* -----------------------------------------------------
DELETE GROUP
----------------------------------------------------- */
export async function deleteGroup(id: number): Promise<boolean> {
    return executeWithErrorHandling(async () => { 
        await api.delete(`/groups/${id}`);
        return true;
    },"Erro ao remover grupo")
}
