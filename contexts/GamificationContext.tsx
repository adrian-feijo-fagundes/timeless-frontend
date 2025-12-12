import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Achievement = {
  id: number;
  type: string;
  title: string;
  description: string;
  rewardXp: number;
  unlockedAt: string;
};

export type GamificationData = {
  xp: number;
  level: number;
  xpForNextLevel: number;
  taskStreak: number;
  totalTasksCompleted: number;
  totalTasksCreated: number;
  achievements: Achievement[];
};

export type CompleteTaskResponse = {
  task: any;
  gamification: {
    xpGained: number;
    leveledUp: boolean;
    newLevel?: number;
    rewardXp?: number;
    streak: number;
    isNewStreakRecord: boolean;
  };
};

type GamificationContextType = {
  data: GamificationData | null;
  xp: number;
  streak: number;
  loading: boolean;
  refreshing: boolean;
  fetchGamification: () => Promise<void>;
  completeTask: (taskId: number) => Promise<CompleteTaskResponse>;
};

const GamificationContext = createContext<GamificationContextType>({
  data: null,
  xp: 0,
  streak: 0,
  loading: false,
  refreshing: false,
  fetchGamification: async () => {},
  completeTask: async () => {
    throw new Error("completeTask não implementado");
  },
});

export const GamificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<GamificationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchGamification = useCallback(async () => {
    try {
      setRefreshing(true);
      const response = await api.get("/gamification");
      setData(response.data);
    } catch (err) {
      console.log("Erro ao buscar gamificação:", err);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }, []);

  const completeTask = useCallback(
    async (taskId: number) => {
      try {
        const response = await api.patch(`/task/${taskId}/complete`);

        // Atualiza a gamificação após completar tarefa
        fetchGamification();

        return response.data as CompleteTaskResponse;
      } catch (err) {
        console.log("Erro ao completar tarefa:", err);
        throw err;
      }
    },
    [fetchGamification]
  );

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        fetchGamification();
      } else {
        setLoading(false);
      }
    })();
  }, [fetchGamification]);

  return (
    <GamificationContext.Provider
      value={{
        data,
        xp: data?.xp ?? 0,
        streak: data?.taskStreak ?? 0,
        loading,
        refreshing,
        fetchGamification,
        completeTask,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => useContext(GamificationContext);
