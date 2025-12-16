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
  const [data, setData] = useState<GamificationData | null>(null);

  async function refresh() {
    const res = await getGamification();
    setData(res);
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <GamificationContext.Provider value={{ data, refresh }}>
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  return useContext(GamificationContext);
}
