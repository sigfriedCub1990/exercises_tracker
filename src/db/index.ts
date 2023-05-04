import mongoose from "mongoose";

const connectDB = async (mongoURL: string) => {
  mongoose.connect(`${mongoURL}`).then(() => console.log("DB Connected"));
};

export { connectDB as default };
