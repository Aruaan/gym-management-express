import { MigrationInterface, QueryRunner } from "typeorm";

export class ExerciseFieldUpdate1710167739910 implements MigrationInterface {
    name = 'ExerciseFieldUpdate1710167739910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exercises\` ADD \`set_count\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`exercises\` ADD \`rep_count\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`exercises\` ADD \`weight\` decimal(5,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exercises\` DROP COLUMN \`weight\``);
        await queryRunner.query(`ALTER TABLE \`exercises\` DROP COLUMN \`rep_count\``);
        await queryRunner.query(`ALTER TABLE \`exercises\` DROP COLUMN \`set_count\``);
    }

}
