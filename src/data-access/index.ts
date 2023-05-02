import models from "../models";
import makePersonDb from "./person.db";
import makeExerciseDb from "./exercise.db";

const personDb = makePersonDb(models);
const exerciseDb = makeExerciseDb(models);

export { personDb, exerciseDb };
