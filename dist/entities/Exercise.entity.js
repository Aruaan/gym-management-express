"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exercise = void 0;
const typeorm_1 = require("typeorm");
const Workout_entity_1 = require("./Workout.entity");
const Equipment_entity_1 = require("./Equipment.entity");
const Exercise_enum_1 = require("../enums/Exercise.enum");
let Exercise = class Exercise {
    constructor() {
        this.workout = new Workout_entity_1.Workout;
    }
};
exports.Exercise = Exercise;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Exercise.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { name: 'workout_id' }),
    __metadata("design:type", String)
], Exercise.prototype, "workoutId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", name: 'created_at' }),
    __metadata("design:type", Date)
], Exercise.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Exercise_enum_1.ExerciseType, nullable: true }),
    __metadata("design:type", Object)
], Exercise.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, type: "varchar", nullable: true }),
    __metadata("design:type", Object)
], Exercise.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Workout_entity_1.Workout, workout => workout.exercise),
    (0, typeorm_1.JoinColumn)({ name: 'workout_id', referencedColumnName: 'id' }),
    __metadata("design:type", Workout_entity_1.Workout)
], Exercise.prototype, "workout", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Equipment_entity_1.Equipment, equipment => equipment.exercises),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Exercise.prototype, "equipment", void 0);
exports.Exercise = Exercise = __decorate([
    (0, typeorm_1.Entity)({ name: 'exercises' })
], Exercise);
