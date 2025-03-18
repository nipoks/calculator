import {ExpressionHistoryDTO} from "../types/calculator.types";
import {IHistoryExpression} from "../models/HistoryExpression";

export const mapUsersToUsersDTO = (arrUsers: IHistoryExpression[]):ExpressionHistoryDTO[] => {
    return arrUsers.map((expression: IHistoryExpression) => {
        return {
            expression: expression.expression,
            id: expression._id.toString(),
            date: expression.date,
        }
    })
}