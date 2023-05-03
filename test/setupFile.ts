import mongoose from "mongoose";

beforeAll(async () => {
  const mongoURI = process.env["MONGO_URI"] || "";
  await mongoose.connect(mongoURI);
});

afterAll(async () => {
  await mongoose.disconnect();
});
