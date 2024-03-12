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
exports.Meal = void 0;
const typeorm_1 = require("typeorm");
const Member_entity_1 = require("./Member.entity");
let Meal = class Meal {
};
exports.Meal = Meal;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Meal.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', name: 'member_id' }),
    __metadata("design:type", String)
], Meal.prototype, "memberId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', name: 'created_at' }),
    __metadata("design:type", Date)
], Meal.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 40, type: "varchar" }),
    __metadata("design:type", String)
], Meal.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], Meal.prototype, "calories", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, type: "varchar", nullable: true }),
    __metadata("design:type", Object)
], Meal.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Member_entity_1.Member, member => member.meals),
    (0, typeorm_1.JoinColumn)({ name: 'member_id', referencedColumnName: 'id' }),
    __metadata("design:type", Member_entity_1.Member)
], Meal.prototype, "member", void 0);
exports.Meal = Meal = __decorate([
    (0, typeorm_1.Entity)({ name: 'meals' })
], Meal);
