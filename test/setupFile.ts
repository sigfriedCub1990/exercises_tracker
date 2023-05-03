import mongoose from "mongoose";
import { userDb, exerciseDb } from "../src/data-access";

beforeAll(async () => {
  const mongoURI = process.env["MONGO_URI"] || "";
  await mongoose.connect(mongoURI);
});

afterAll(async () => {
  await mongoose.disconnect();
});

afterEach(async () => {
  await Promise.all([userDb.removeMany({}), exerciseDb.removeMany({})]);
});
