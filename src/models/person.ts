import { Schema } from "mongoose";

interface IPerson {
  username: string;
}

const personSchema = new Schema<IPerson>({
  username: {
    type: String,
    required: true,
  },
});

export { personSchema as default, IPerson };
