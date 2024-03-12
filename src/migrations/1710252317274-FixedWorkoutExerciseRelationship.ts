import { MigrationInterface, QueryRunner } from "typeorm";

export class FixedWorkoutExerciseRelationship1710252317274 implements MigrationInterface {
    name = 'FixedWorkoutExerciseRelationship1710252317274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exercise_equipment\` DROP FOREIGN KEY \`FK_96a58fe75afd4920928496d6a11\``);
        await queryRunner.query(`ALTER TABLE \`exercise_equipment\` DROP FOREIGN KEY \`FK_db115ed207d568e5d9cbaad1c63\``);
        await queryRunner.query(`ALTER TABLE \`exercise_equipment\` ADD CONSTRAINT \`FK_db115ed207d568e5d9cbaad1c63\` FOREIGN KEY (\`equipment_id\`) REFERENCES \`equipment\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`exercise_equipment\` ADD CONSTRAINT \`FK_96a58fe75afd4920928496d6a11\` FOREIGN KEY (\`exercise_id\`) REFERENCES \`exercises\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exercise_equipment\` DROP FOREIGN KEY \`FK_96a58fe75afd4920928496d6a11\``);
        await queryRunner.query(`ALTER TABLE \`exercise_equipment\` DROP FOREIGN KEY \`FK_db115ed207d568e5d9cbaad1c63\``);
        await queryRunner.query(`ALTER TABLE \`exercise_equipment\` ADD CONSTRAINT \`FK_db115ed207d568e5d9cbaad1c63\` FOREIGN KEY (\`equipment_id\`) REFERENCES \`equipment\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`exercise_equipment\` ADD CONSTRAINT \`FK_96a58fe75afd4920928496d6a11\` FOREIGN KEY (\`exercise_id\`) REFERENCES \`exercises\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
