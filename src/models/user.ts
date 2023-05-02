import { Schema, Types } from "mongoose";

interface IUser {
  username: string;
  log?: Array<Types.ObjectId>;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  log: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
});

export { userSchema as default, IUser };
