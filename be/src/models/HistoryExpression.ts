import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IHistoryExpression extends Document {
    userId: ObjectId;
    expression: string;
    date: Date;
    _id: ObjectId
}

const HistoryExpressionSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    expression: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const HistoryExpression = mongoose.model<IHistoryExpression>("HistoryExpression", HistoryExpressionSchema);

export default HistoryExpression;
