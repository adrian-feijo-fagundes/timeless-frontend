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
  const [tasks, setTasks] = useState<TaskResponse[]>([]);

  async function refreshTasks() {
    const res = await request(() => listTasks());
    if (res) setTasks(res);
  }

  useEffect(() => {
    refreshTasks();
  }, []);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
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
