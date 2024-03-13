import { MigrationInterface, QueryRunner } from "typeorm";

export class ExerciseEntityFix1710340802270 implements MigrationInterface {
    name = 'ExerciseEntityFix1710340802270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exercise_equipment\` DROP FOREIGN KEY \`FK_96a58fe75afd4920928496d6a11\``);
        await queryRunner.query(`ALTER TABLE \`exercise_equipment\` DROP FOREIGN KEY \`FK_db115ed207d568e5d9cbaad1c63\``);
        await queryRunner.query(`ALTER TABLE \`exercises\` ADD \`name\` varchar(40) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`exercises\` ADD \`setCount\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`exercises\` ADD \`repCount\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`exercises\` ADD \`weight\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`exercise_equipment\` ADD CONSTRAINT \`FK_db115ed207d568e5d9cbaad1c63\` FOREIGN KEY (\`equipment_id\`) REFERENCES \`equipment\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`exercise_equipment\` ADD CONSTRAINT \`FK_96a58fe75afd4920928496d6a11\` FOREIGN KEY (\`exercise_id\`) REFERENCES \`exercises\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exercise_equipment\` DROP FOREIGN KEY \`FK_96a58fe75afd4920928496d6a11\``);
        await queryRunner.query(`ALTER TABLE \`exercise_equipment\` DROP FOREIGN KEY \`FK_db115ed207d568e5d9cbaad1c63\``);
        await queryRunner.query(`ALTER TABLE \`exercises\` DROP COLUMN \`weight\``);
        await queryRunner.query(`ALTER TABLE \`exercises\` DROP COLUMN \`repCount\``);
        await queryRunner.query(`ALTER TABLE \`exercises\` DROP COLUMN \`setCount\``);
        await queryRunner.query(`ALTER TABLE \`exercises\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`exercise_equipment\` ADD CONSTRAINT \`FK_db115ed207d568e5d9cbaad1c63\` FOREIGN KEY (\`equipment_id\`) REFERENCES \`equipment\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`exercise_equipment\` ADD CONSTRAINT \`FK_96a58fe75afd4920928496d6a11\` FOREIGN KEY (\`exercise_id\`) REFERENCES \`exercises\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
