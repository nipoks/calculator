import {ExpressionHistoryDTO, ExpressionMemoryDTO} from "../types/calculator.types";
import {IHistoryExpression} from "../models/HistoryExpression";
import {IUser} from "../models/User";

export const mapUsersToUsersDTO = (arrUsers: IHistoryExpression[]):ExpressionHistoryDTO[] => {
    return arrUsers.map((exp: IHistoryExpression) => {
        return {
            expression: exp.expression,
            id: exp._id.toString(),
            date: exp.date,
        }
    })
}

export const mapUserToExpressionMemoryDTO = (user: IUser):ExpressionMemoryDTO => {
    return {
        expression: user.curExpression,
        memory: user.memoryNumber,
    }
}
