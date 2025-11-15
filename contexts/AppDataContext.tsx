import { createContext, ReactNode, useContext, useState } from "react";

interface UserData {
  id: string;
  name: string;
  email: string;
}

interface AppDataContextType {
  logged: boolean;
  setLogged: (value: boolean) => void;
  user: UserData | null;
  setUser: (value: UserData | null) => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  return (
    <AppDataContext.Provider value={{ logged, setLogged, user, setUser }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData deve ser usado dentro do AppDataProvider");
  }
  return context;
}
