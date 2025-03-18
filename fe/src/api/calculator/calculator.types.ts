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