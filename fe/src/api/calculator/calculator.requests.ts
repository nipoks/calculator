import { createRequest } from '../createRequest'
import {HistoryInput, ExpressionOutput, AddNewExpressionInput, HistoryItem} from "./calculator.types.ts";

const backendUrlPrefix = import.meta.env.VITE_BACKEND_URL

export async function getHistory(data: HistoryInput): Promise<HistoryItem[]> {
    return createRequest<HistoryItem[]>({
        url: `${backendUrlPrefix}/api/calculator/history/${data.userId}`,
        isProtectRequest: true,
    })
}

export async function addNewExpressionToHistory(data: AddNewExpressionInput): Promise<HistoryItem> {
    return createRequest<HistoryItem>({
        url: `${backendUrlPrefix}/api/calculator/history`,
        isProtectRequest: true,
        method: "POST",
        data: data,
    })
}

export async function getExpression(data: HistoryInput): Promise<ExpressionOutput> {
    return createRequest<ExpressionOutput>({
        url: `${backendUrlPrefix}/api/calculator/expression/${data.userId}`,
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
