import { MigrationInterface, QueryRunner } from "typeorm";

export class ExerciseFieldUpdate21710169842353 implements MigrationInterface {
    name = 'ExerciseFieldUpdate21710169842353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exercises\` ADD \`name\` varchar(40) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exercises\` DROP COLUMN \`name\``);
    }

}
