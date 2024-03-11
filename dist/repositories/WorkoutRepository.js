"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutRepository = void 0;
const Workout_entity_1 = require("../entities/Workout.entity");
const app_data_source_1 = __importDefault(require("../app-data-source"));
exports.WorkoutRepository = app_data_source_1.default.getRepository(Workout_entity_1.Workout).extend({
    async createAndSave(workoutData) {
        return await this.save(this.create(workoutData));
    },
    async findAll() {
        return await this.find();
    },
    async findById(id) {
        return await this.findOneBy({ id });
    },
    async update(id, workoutData) {
        await this.manager.update(Workout_entity_1.Workout, id, workoutData);
    },
    async delete(id) {
        await this.manager.delete(Workout_entity_1.Workout, id);
    }
});
