// models/Message.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMessage extends Document {
  user: string;
  text: string;
}

const MessageSchema = new Schema<IMessage>(
  {
    user: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const Message: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);

export default Message;
