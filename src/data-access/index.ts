import models from "../models";
import makeUserDb from "./user.db";
import makeExerciseDb from "./exercise.db";

const userDb = makeUserDb(models);
const exerciseDb = makeExerciseDb(models);

export { userDb, exerciseDb };
