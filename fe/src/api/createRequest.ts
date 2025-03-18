import axios, { AxiosError, AxiosRequestConfig } from 'axios'

axios.defaults.timeout = 30_000 // in milliseconds
axios.defaults.headers.common = { 'Content-Type': 'application/json' }

interface ErrorResponse {
    code: number
    createdAt: string
    message: string
}

export class ServerError extends Error {
    public code: number

    public createdAt: string

    constructor(data: ErrorResponse) {
        super(data.message)
        this.code = data.code
        this.createdAt = data.createdAt
    }
}

export interface RequestConfig extends AxiosRequestConfig {
    isProtectRequest?: boolean
}

export async function createRequest<T>(config: RequestConfig): Promise<T> {
    try {
        const { data } = await axios(config);
        return data;
    } catch (error) {
        const axiosError = error as AxiosError;
        const errorResponse = (axiosError.response?.data as ErrorResponse) || {
            message: 'Внутренняя ошибка сервера',
            createdAt: new Date().toISOString(),
            code: 500,
        };
        throw new ServerError(errorResponse);
    }
}

