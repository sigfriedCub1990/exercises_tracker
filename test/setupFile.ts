import mongoose from "mongoose";

beforeAll(async () => {
  // @ts-ignore
  await mongoose.connect(process.env["MONGO_URI"]);
});

afterAll(async () => {
  await mongoose.disconnect();
});
