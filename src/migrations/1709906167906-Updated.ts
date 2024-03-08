import { MigrationInterface, QueryRunner } from "typeorm";

export class Updated1709906167906 implements MigrationInterface {
    name = 'Updated1709906167906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`equipment\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`equipment\` ADD \`type\` enum ('barbell', 'dumbbell', 'machine', 'cardio') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`exercises\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`exercises\` ADD \`type\` enum ('strength', 'cardio', 'hypertrophy') NULL`);
        await queryRunner.query(`ALTER TABLE \`workouts\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`workouts\` ADD \`type\` enum ('strength', 'cardio', 'hypertrophy', 'endurance', 'powerbuilding') NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`workouts\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`workouts\` ADD \`type\` varchar(30) NULL`);
        await queryRunner.query(`ALTER TABLE \`exercises\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`exercises\` ADD \`type\` varchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`equipment\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`equipment\` ADD \`type\` varchar(30) NOT NULL`);
    }

}
