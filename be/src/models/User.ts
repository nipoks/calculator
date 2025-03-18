import mongoose, { Schema, Document, ObjectId } from "mongoose"

export interface IUser extends Document {
    email: string
    password: string
    curExpression: string
    memoryNumber: string | undefined
    _id: ObjectId
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    curExpression: { type: String, default: "0" },
    memoryNumber: { type: String, default: undefined },
})

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
