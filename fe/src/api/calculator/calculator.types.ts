export type HistoryInput = {
    userId: string
}

export type HistoryItem = {
    expression: string
    id: string
    date: string
}

export type AddNewExpressionInput = {
    userId: string
    expression: string
}

export type MemoryInput = {
    userId: string
    memory: number | undefined
}

export type ExpressionMemoryOutput = {
    expression: string
    memory: number
}