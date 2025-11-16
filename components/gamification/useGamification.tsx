import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@timeless:gamification";

export function useGamification() {
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        setXp(parsed.xp || 0);
        setStreak(parsed.streak || 0);
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ xp, streak })
    );
  }, [xp, streak]);

  const addXP = (amount: number) => setXp((v) => v + amount);

  const registerStreak = () => {
    setStreak((s) => s + 1);
    addXP(5);
  };

  return { xp, streak, addXP, registerStreak };
}
