"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberRepository = void 0;
const Member_entity_1 = require("../entities/Member.entity");
const app_data_source_1 = __importDefault(require("../app-data-source"));
exports.MemberRepository = app_data_source_1.default.getRepository(Member_entity_1.Member).extend({
    async createAndSave(memberData) {
        return await this.save(this.create(memberData));
    },
    async findAll() {
        return await this.find();
    },
    async findById(id) {
        return await this.findOneBy({ id });
    },
    async update(id, memberData) {
        await this.manager.update(Member_entity_1.Member, id, memberData);
    },
    async delete(id) {
        await this.manager.delete(Member_entity_1.Member, id);
    }
});
