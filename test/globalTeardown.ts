import { MongoMemoryServer } from "mongodb-memory-server";
import config from "../src/utils/config";

export = async function globalTeardown() {
  if (config.Memory) {
    const instance: MongoMemoryServer = (global as any).__MONGOINSTANCE;
    await instance.stop();
  }
};
