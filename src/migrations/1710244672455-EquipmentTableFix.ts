import { MigrationInterface, QueryRunner } from "typeorm";

export class EquipmentTableFix1710244672455 implements MigrationInterface {
    name = 'EquipmentTableFix1710244672455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`equipment_exercises_exercises\` (\`equipmentId\` varchar(36) NOT NULL, \`exercisesId\` varchar(36) NOT NULL, INDEX \`IDX_3a8bcd56c4f7c3259a868994e5\` (\`equipmentId\`), INDEX \`IDX_065a35363914b6e2ddbc92da5a\` (\`exercisesId\`), PRIMARY KEY (\`equipmentId\`, \`exercisesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`equipment_exercises_exercises\` ADD CONSTRAINT \`FK_3a8bcd56c4f7c3259a868994e5a\` FOREIGN KEY (\`equipmentId\`) REFERENCES \`equipment\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`equipment_exercises_exercises\` ADD CONSTRAINT \`FK_065a35363914b6e2ddbc92da5a0\` FOREIGN KEY (\`exercisesId\`) REFERENCES \`exercises\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`equipment_exercises_exercises\` DROP FOREIGN KEY \`FK_065a35363914b6e2ddbc92da5a0\``);
        await queryRunner.query(`ALTER TABLE \`equipment_exercises_exercises\` DROP FOREIGN KEY \`FK_3a8bcd56c4f7c3259a868994e5a\``);
        await queryRunner.query(`DROP INDEX \`IDX_065a35363914b6e2ddbc92da5a\` ON \`equipment_exercises_exercises\``);
        await queryRunner.query(`DROP INDEX \`IDX_3a8bcd56c4f7c3259a868994e5\` ON \`equipment_exercises_exercises\``);
        await queryRunner.query(`DROP TABLE \`equipment_exercises_exercises\``);
    }

}
