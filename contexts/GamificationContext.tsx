import { useAppData } from "@/contexts/AppDataContext";
import { getGamification } from "@/services/gameficationService";
import React, { createContext, useContext, useEffect, useState } from "react";

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

type GamificationContextType = {
  data: GamificationData | null;
  loading: boolean;
  refresh: () => Promise<void>;
};

const GamificationContext = createContext<GamificationContextType>(
  {} as GamificationContextType
);

export function GamificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logged } = useAppData();
  const [data, setData] = useState<GamificationData | null>(null);
  const [loading, setLoading] = useState(false);

  async function refresh() {
    if (!logged) return;
    try {
      setLoading(true);
      const res = await getGamification();
      setData(res);
    } catch (err) {
      console.log("Erro ao buscar gamificação:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (logged) {
      refresh();
    } else {
      setData(null);
    }
  }, [logged]);

  return (
    <GamificationContext.Provider value={{ data, loading, refresh }}>
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  return useContext(GamificationContext);
}
