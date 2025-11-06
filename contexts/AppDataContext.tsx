import { createContext, ReactNode, useContext, useState } from "react"


interface AppDataContextType {
    logged: boolean
    setLogged: (value: boolean) => void
}
const AppDataContext = createContext<AppDataContextType | undefined>(undefined)

export function AppDataProvider({ children }: { children: ReactNode }) {
    const [logged, setLogged] = useState(false)

    return (
        <AppDataContext.Provider value={{logged, setLogged}}>
            {children}
        </AppDataContext.Provider>
    )
}

export function useAppData() {
    const context = useContext(AppDataContext)
    if (!context) {
        throw new Error("useAppData deve ser usado dentro do AppDataProvider")
    }
    return context
}
