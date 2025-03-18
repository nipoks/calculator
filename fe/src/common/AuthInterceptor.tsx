import axios from 'axios'
import { FC, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { RequestConfig, ServerError } from '../api/createRequest.ts'
import { WithChildren } from './WithChildren.ts'
import { useAuthContext } from '../context/authContext/authContext.ts'


export const AuthInterceptor: FC<WithChildren> = ({ children }) => {
    const { authClient, authState } = useAuthContext()
    const navigate = useNavigate()

    useMemo(() => {
        axios.interceptors.request.use(async (config) => {
            const requestConfig = config as RequestConfig
            if (!requestConfig.isProtectRequest) {
                return config
            }

            if (authClient.isAccessTokenExpired()) {
                try {
                    await authClient.refresh()
                } catch (error) {
                    const serverError = error as ServerError
                    console.log(serverError.message)
                    navigate('/login')
                    throw error
                }
            }
            const accessToken = authState?.accessToken
            if (accessToken && config.headers) {
                config.headers.Authorization = `Bearer ${accessToken}`
            }
            return config
        })
    }, [authClient, navigate])

    return <>{children}</>
}
