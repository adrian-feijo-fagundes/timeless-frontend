import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

type Achievement = {
  id: number;
  type: string;
  title: string;
  description: string;
  rewardXp: number;
  unlockedAt: string;
};

type GamificationData = {
  xp: number;
  level: number;
  xpForNextLevel: number;
  taskStreak: number;
  totalTasksCompleted: number;
  totalTasksCreated: number;
  achievements: Achievement[];
};

type CompleteTaskResponse = {
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
  loading: boolean;
  fetchGamification: () => Promise<void>;
  completeTask: (taskId: number) => Promise<CompleteTaskResponse>;
};

const GamificationContext = createContext<GamificationContextType>({
  data: null,
  loading: false,
  fetchGamification: async () => {},
  completeTask: async () => {
    throw new Error("Function not implemented");
  },
});

export const GamificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<GamificationData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchGamification = async () => {
    try {
      setLoading(true);
      const response = await api.get("/gamification");
      setData(response.data);
    } finally {
      setLoading(false);
    }
  };

  const completeTask = async (taskId: number) => {
    const response = await api.patch(`/task/${taskId}/complete`);
    await fetchGamification();
    return response.data as CompleteTaskResponse;
  };

  useEffect(() => {
    fetchGamification();
  }, []);

  return (
    <GamificationContext.Provider
      value={{
        data,
        loading,
        fetchGamification,
        completeTask,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => useContext(GamificationContext);
