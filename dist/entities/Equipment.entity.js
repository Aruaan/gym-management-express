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
exports.Equipment = void 0;
const typeorm_1 = require("typeorm");
const Exercise_entity_1 = require("./Exercise.entity");
const Equipment_enum_1 = require("../enums/Equipment.enum");
let Equipment = class Equipment extends typeorm_1.BaseEntity {
};
exports.Equipment = Equipment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Equipment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, type: "varchar" }),
    __metadata("design:type", String)
], Equipment.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: Equipment_enum_1.EquipmentType }),
    __metadata("design:type", String)
], Equipment.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", nullable: true, name: 'purchase_date' }),
    __metadata("design:type", Object)
], Equipment.prototype, "purchaseDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, type: "varchar", nullable: true }),
    __metadata("design:type", Object)
], Equipment.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Exercise_entity_1.Exercise, exercise => exercise.equipment),
    __metadata("design:type", Array)
], Equipment.prototype, "exercises", void 0);
exports.Equipment = Equipment = __decorate([
    (0, typeorm_1.Entity)()
], Equipment);
