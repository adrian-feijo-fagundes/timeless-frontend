export interface User {
    id: number,
    email: string
}
export interface LoginResponse {
    message: string,
    token: string,
    user: User
}
export interface RegisterResponse {
    message: string
}