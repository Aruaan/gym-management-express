"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTypeChanges1710153784026 = void 0;
class DateTypeChanges1710153784026 {
    constructor() {
        this.name = 'DateTypeChanges1710153784026';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`measurements\` CHANGE \`date\` \`created_at\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`workouts\` CHANGE \`date\` \`created_at\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`exercises\` CHANGE \`date\` \`created_at\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`measurements\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`measurements\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`meals\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`meals\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`members\` DROP COLUMN \`join_date\``);
        await queryRunner.query(`ALTER TABLE \`members\` ADD \`join_date\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`workouts\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`workouts\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`equipment\` DROP COLUMN \`purchase_date\``);
        await queryRunner.query(`ALTER TABLE \`equipment\` ADD \`purchase_date\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`exercises\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`exercises\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`exercises\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`exercises\` ADD \`created_at\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`equipment\` DROP COLUMN \`purchase_date\``);
        await queryRunner.query(`ALTER TABLE \`equipment\` ADD \`purchase_date\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`workouts\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`workouts\` ADD \`created_at\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`members\` DROP COLUMN \`join_date\``);
        await queryRunner.query(`ALTER TABLE \`members\` ADD \`join_date\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`meals\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`meals\` ADD \`created_at\` datetime(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`measurements\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`measurements\` ADD \`created_at\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`exercises\` CHANGE \`created_at\` \`date\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`workouts\` CHANGE \`created_at\` \`date\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`measurements\` CHANGE \`created_at\` \`date\` date NOT NULL`);
    }
}
exports.DateTypeChanges1710153784026 = DateTypeChanges1710153784026;
