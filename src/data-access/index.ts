import models from "../models";
import makePersonDb from "./person.db";

const personDb = makePersonDb(models);

export { personDb };
