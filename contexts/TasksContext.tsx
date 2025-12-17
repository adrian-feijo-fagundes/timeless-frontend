import { useAppData } from "@/contexts/AppDataContext";
import { useApi } from "@/hooks/useApi";
import { listTasks, TaskResponse } from "@/services/taskService";
import React, { createContext, useContext, useEffect, useState } from "react";

type TasksContextType = {
  tasks: TaskResponse[];
  loadingTasks: boolean;
  refreshTasks: () => Promise<void>;
  setTasks: React.Dispatch<React.SetStateAction<TaskResponse[]>>;
};

const TasksContext = createContext<TasksContextType>({} as TasksContextType);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const { request, loading } = useApi();
  const { isAuthenticated, loadingAppData } = useAppData();

  const [tasks, setTasks] = useState<TaskResponse[]>([]);

  async function refreshTasks() {
    if (!isAuthenticated) return;

    const res = await request(() => listTasks());
    if (res) setTasks(res);
  }

  useEffect(() => {
    // ainda carregando AppData (token, user, etc)
    if (loadingAppData) return;

    // logout
    if (!isAuthenticated) {
      setTasks([]);
      return;
    }

    // login concluído → carrega tarefas
    refreshTasks();
  }, [isAuthenticated, loadingAppData]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loadingTasks: loading,
        refreshTasks,
        setTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}
