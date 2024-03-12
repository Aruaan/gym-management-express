"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Updated1709906167906 = void 0;
class Updated1709906167906 {
    constructor() {
        this.name = 'Updated1709906167906';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`equipment\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`equipment\` ADD \`type\` enum ('barbell', 'dumbbell', 'machine', 'cardio') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`exercises\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`exercises\` ADD \`type\` enum ('strength', 'cardio', 'hypertrophy') NULL`);
        await queryRunner.query(`ALTER TABLE \`workouts\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`workouts\` ADD \`type\` enum ('strength', 'cardio', 'hypertrophy', 'endurance', 'powerbuilding') NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`workouts\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`workouts\` ADD \`type\` varchar(30) NULL`);
        await queryRunner.query(`ALTER TABLE \`exercises\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`exercises\` ADD \`type\` varchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`equipment\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`equipment\` ADD \`type\` varchar(30) NOT NULL`);
    }
}
exports.Updated1709906167906 = Updated1709906167906;
