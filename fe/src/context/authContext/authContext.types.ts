import { JwtPayload } from 'jwt-decode'

export type LoginInput = {
    password: string
    email: string
}

export type LoginOutput = {
    accessToken: string
    refreshToken: string
}

export interface AccessJwtPayload extends JwtPayload {
    userId: string
    email: string
}

export type AuthState = {
    accessToken: string
    id: string
    refreshToken: string
    email: string
}

export type AuthClient = {
    login: (input: LoginInput) => Promise<LoginOutput>
    register: (input: LoginInput) => Promise<void>
    refresh: () => Promise<LoginOutput>
    logout: () => void
    isAuthenticated: () => boolean
    isAccessTokenExpired: () => boolean
}
