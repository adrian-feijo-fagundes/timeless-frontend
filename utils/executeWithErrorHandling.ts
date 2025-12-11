export async function executeWithErrorHandling<T>(
    action: () => Promise<T>,
    message?: string,
): Promise<T> {
    try {
        return await action();
    } catch (error: any) {
        console.error("Erro na requisição:", error);

        // Erro com resposta do servidor
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }

        // Servidor não respondeu
        if (error.request) {
            throw new Error("Servidor não respondeu. Tente novamente.");
        }

        // Erro genérico
        throw new Error(message || "Erro inesperado. Tente novamente.");
    }
}
