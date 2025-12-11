import { AxiosError } from "axios";
import { useCallback, useState } from "react";

export function useApi() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const request = useCallback(async <T,>(
        action: () => Promise<T>,
        customMessage?: string
    ): Promise<T | null> => {
        setLoading(true);
        setError(null);

        try {
            const result = await action();
            return result;
        } catch (err) {
            const error = err as AxiosError<any>;
            console.error("API ERROR →", error);

            // Erro do backend
            if (error.response?.data?.message) {
                setError(error.response.data.message);
                return null;
            }

            // Erro de falta de conexão
            if (error.request) {
                setError("Sem conexão com o servidor.");
                return null;
            }

            // Erro desconhecido
            setError(customMessage || "Erro inesperado. Tente novamente.");
            return null;

        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, error, request };
}
