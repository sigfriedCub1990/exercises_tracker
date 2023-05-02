import mongoose from "mongoose";

const onConnected = () => console.log("MongoDB connected");
const onError = (error: Error) => console.error(error.message);

let db;
const connectDB = async (mongoURL: string) => {
  db = mongoose
    .createConnection(mongoURL)
    .on("connected", onConnected)
    .on("error", onError);
};

export { connectDB as default, db };
