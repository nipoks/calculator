import {UserDTO} from "../types/user.types";
import {IUser} from "../models/User";

export const mapUsersToUsersDTO = (arrUsers: IUser[]):UserDTO[] => {
    return arrUsers.map((user: IUser) => {
        return {
            email: user.email,
            id: user._id.toString(),
        }
    })
}