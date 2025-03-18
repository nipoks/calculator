import { createRequest } from '../createRequest'
import {HistoryInput, HistoryOutput, ExpressionOutput, AddNewExpressionInput} from "./calculator.types.ts";

const backendUrlPrefix = import.meta.env.VITE_BACKEND_URL

export async function getHistory(data: HistoryInput): Promise<HistoryOutput> {
    return createRequest<HistoryOutput>({
        url: `${backendUrlPrefix}/api/calculator/history?idUser=${data.idUser}`,
        isProtectRequest: true,
    })
}

export async function addNewExpressionToHistory(data: AddNewExpressionInput): Promise<void> {
    return createRequest<void>({
        url: `${backendUrlPrefix}/api/calculator/history`,
        isProtectRequest: true,
        method: "POST",
        data: data,
    })
}

export async function getExpression(data: HistoryInput): Promise<ExpressionOutput> {
    return createRequest<ExpressionOutput>({
        url: `${backendUrlPrefix}/api/calculator/expression?idUser=${data.idUser}`,
        isProtectRequest: true,
    })
}

export async function updateCurUserExpression(data: AddNewExpressionInput): Promise<void> {
    return createRequest<void>({
        url: `${backendUrlPrefix}/api/calculator/expression`,
        isProtectRequest: true,
        method: "POST",
        data: data,
    })
}
