import { createContext, useCallback, useContext, useState } from "react";

const STORAGE_KEY = "active-project-id";

interface ActiveProjectContextValue {
  activeProjectId: string | null;
  setActiveProjectId: (id: string) => void;
}

const ActiveProjectContext = createContext<ActiveProjectContextValue | undefined>(undefined);

export function ActiveProjectProvider({ children }: { children: React.ReactNode }) {
  const [activeProjectId, setActiveProjectIdState] = useState<string | null>(() =>
    localStorage.getItem(STORAGE_KEY),
  );

  const setActiveProjectId = useCallback((id: string) => {
    localStorage.setItem(STORAGE_KEY, id);
    setActiveProjectIdState(id);
  }, []);

  return (
    <ActiveProjectContext.Provider value={{ activeProjectId, setActiveProjectId }}>
      {children}
    </ActiveProjectContext.Provider>
  );
}

export function useActiveProject() {
  const context = useContext(ActiveProjectContext);
  if (context === undefined) {
    throw new Error("useActiveProject must be used within an ActiveProjectProvider");
  }
  return context;
}
