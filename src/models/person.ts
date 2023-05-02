import { Schema, Types } from "mongoose";

interface IPerson {
  username: string;
  log?: Array<Types.ObjectId>;
}

const personSchema = new Schema<IPerson>({
  username: {
    type: String,
    required: true,
  },
  log: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
});

export { personSchema as default, IPerson };
