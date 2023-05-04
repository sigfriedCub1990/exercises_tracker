import mongoose from "mongoose";

const onConnected = () => {
  if (process.env.NODE_ENV !== "test") {
    console.log("MongoDB connected");
  }
};
const onError = (error: Error) => console.error(error.message);

const connectDB = async (mongoURL: string) => {
  mongoose.connect(`${mongoURL}`).then((_) => console.log("DB Connected"));
};

export { connectDB as default };
