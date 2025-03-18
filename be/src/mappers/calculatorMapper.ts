import {ExpressionHistoryDTO} from "../types/calculator.types";
import {IHistoryExpression} from "../models/HistoryExpression";

export const mapUsersToUsersDTO = (arrUsers: IHistoryExpression[]):ExpressionHistoryDTO[] => {
    return arrUsers.map((exp: IHistoryExpression) => {
        return {
            expression: exp.expression,
            id: exp._id.toString(),
            date: exp.date,
        }
    })
}
