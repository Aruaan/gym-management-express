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
exports.Member = void 0;
const typeorm_1 = require("typeorm");
const Workout_entity_1 = require("./Workout.entity");
const Measurement_entity_1 = require("./Measurement.entity");
const Meal_entity_1 = require("./Meal.entity");
let Member = class Member {
};
exports.Member = Member;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Member.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, type: "varchar", name: 'first_name' }),
    __metadata("design:type", String)
], Member.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, type: "varchar", name: 'last_name' }),
    __metadata("design:type", String)
], Member.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, type: "varchar" }),
    __metadata("design:type", String)
], Member.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", name: 'join_date' }),
    __metadata("design:type", Date)
], Member.prototype, "joinDate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Workout_entity_1.Workout, (workout) => workout.member),
    __metadata("design:type", Array)
], Member.prototype, "workouts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Measurement_entity_1.Measurement, (measurement) => measurement.member),
    __metadata("design:type", Array)
], Member.prototype, "measurements", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Meal_entity_1.Meal, (meal) => meal.member),
    __metadata("design:type", Array)
], Member.prototype, "meals", void 0);
exports.Member = Member = __decorate([
    (0, typeorm_1.Entity)({ name: 'members' })
], Member);
