import { createRequest } from '../createRequest'
import {
    HistoryInput,
    AddNewExpressionInput,
    HistoryItem,
    ExpressionMemoryOutput,
    MemoryInput
} from "./calculator.types.ts";

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

export async function getExpressionAndMemory(data: HistoryInput): Promise<ExpressionMemoryOutput> {
    return createRequest<ExpressionMemoryOutput>({
        url: `${backendUrlPrefix}/api/calculator/expression/${data.userId}`,
        isProtectRequest: true,
    })
}

export async function updateCurUserExpression(data: AddNewExpressionInput): Promise<void> {
    return createRequest<void>({
        url: `${backendUrlPrefix}/api/calculator/expression`,
        isProtectRequest: true,
        method: "PUT",
        data: data,
    })
}

export async function updateUserMemory(data: MemoryInput): Promise<void> {
    return createRequest<void>({
        url: `${backendUrlPrefix}/api/calculator/memory`,
        isProtectRequest: true,
        method: "PUT",
        data: data,
    })
}
