import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'
import { createContainer } from 'react-tracked'

import { createRequest } from '../../api/createRequest'
import { AccessJwtPayload, AuthClient, AuthState, LoginOutput, LoginInput } from './authContext.types'

const AUTH_CONTEXT_KEY = 'authState'
const backendUrlPrefix = import.meta.env.VITE_BACKEND_URL

function getInitialState(): AuthState | undefined {
    const previousState: string | null = localStorage.getItem(AUTH_CONTEXT_KEY)
    if (!previousState) {
        return undefined
    }

    return JSON.parse(previousState) as AuthState
}

const useAuthState = () => useState(getInitialState())
const container = createContainer(useAuthState)

const AuthContextProvider = container.Provider

const useAuthContext = (): { authClient: AuthClient; authState?: AuthState } => {
    const [state, setState] = container.useTracked()

    const updateState = (output: LoginOutput) => {
        console.log(output)
        const decode = jwtDecode(output.accessToken) as AccessJwtPayload
        console.log(decode)
        const newState: AuthState = {
            accessToken: output.accessToken,
            id: decode.userId || '',
            refreshToken: output.refreshToken,
            email: decode.email || 'Неопознанный пользователь',
        }
        setState(newState)
        localStorage.setItem(AUTH_CONTEXT_KEY, JSON.stringify(newState))
    }

    const authService: AuthClient = {
        login: async (input: LoginInput) => {
            const output = await createRequest<LoginOutput>({
                url: `${backendUrlPrefix}/api/auth/login`,
                method: 'POST',
                data: input,
            });
            updateState(output);
            return output;
        },

        register: async (input: LoginInput) => {
            await createRequest({
                url: `${backendUrlPrefix}/api/auth/register`,
                method: 'POST',
                data: input,
            });
        },


        refresh: async () => {
            const output = await createRequest<LoginOutput>({
                url: `${backendUrlPrefix}/api/auth/refresh`,
                method: 'POST',
                data: { accessToken: state?.accessToken },
            })
            updateState(output)
            return output
        },

        logout: () => {
            setState(undefined)
            localStorage.removeItem(AUTH_CONTEXT_KEY)
        },

        isAuthenticated: () => {
            return state !== undefined
        },

        isAccessTokenExpired: () => {
            if (!state?.accessToken) return false
            const expiresIn = jwtDecode(state.accessToken).exp
            console.log(expiresIn)
            return expiresIn === undefined || expiresIn * 1000 < Date.now()
        },
    }

    return { authClient: authService, authState: state }
}

export { AuthContextProvider, useAuthContext }
