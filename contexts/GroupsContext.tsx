// contexts/GroupsContext.tsx
import { useApi } from "@/hooks/useApi";
import { GroupResponse, listGroups } from "@/services/groups";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAppData } from "./AppDataContext";

type GroupsContextType = {
  groups: GroupResponse[];
  loadingGroups: boolean;
  refreshGroups: () => Promise<void>;
};

const GroupsContext = createContext<GroupsContextType>({} as GroupsContextType);

export function GroupsProvider({ children }: { children: React.ReactNode }) {
  const { request, loading } = useApi();
  const { logged } = useAppData();

  const [groups, setGroups] = useState<GroupResponse[]>([]);

  async function refreshGroups() {
    if (!logged) return;

    const res = await request(() => listGroups());
    if (res) setGroups(res);
  }

  useEffect(() => {
    if (logged) {
      refreshGroups();
    } else {
      setGroups([]); // limpa ao deslogar
    }
  }, [logged]);

  return (
    <GroupsContext.Provider
      value={{
        groups,
        loadingGroups: loading,
        refreshGroups,
      }}
    >
      {children}
    </GroupsContext.Provider>
  );
}

export function useGroups() {
  return useContext(GroupsContext);
}
