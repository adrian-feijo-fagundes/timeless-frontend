export function parseBirthDate(input: string): Date | null {
    // validar regex DD/MM/AAAA
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = input.match(regex);
    
    if (!match) return null;
    
    const [_, day, month, year] = match;
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    
    // validar se a data realmente existe
    if (
        date.getFullYear() !== Number(year) ||
        date.getMonth() !== Number(month) - 1 ||
        date.getDate() !== Number(day)
    ) {
        return null;
    }
    
    return date;
}