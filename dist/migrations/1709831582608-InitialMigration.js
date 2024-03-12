"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration1709831582608 = void 0;
class InitialMigration1709831582608 {
    constructor() {
        this.name = 'InitialMigration1709831582608';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`measurements\` (\`id\` varchar(36) NOT NULL, \`member_id\` varchar(255) NOT NULL, \`date\` date NOT NULL, \`weight\` decimal(5,2) NOT NULL, \`bodyfat_percentage\` decimal(5,2) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`meals\` (\`id\` varchar(36) NOT NULL, \`member_id\` varchar(255) NOT NULL, \`created_at\` datetime NOT NULL, \`name\` varchar(40) NOT NULL, \`calories\` decimal(5,2) NOT NULL, \`notes\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`members\` (\`id\` varchar(36) NOT NULL, \`first_name\` varchar(30) NOT NULL, \`last_name\` varchar(30) NOT NULL, \`email\` varchar(50) NOT NULL, \`join_date\` date NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`equipment\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(30) NOT NULL, \`type\` varchar(30) NOT NULL, \`purchase_date\` date NULL, \`notes\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`exercises\` (\`id\` varchar(36) NOT NULL, \`workout_id\` varchar(255) NOT NULL, \`date\` date NOT NULL, \`type\` varchar(20) NOT NULL, \`notes\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workouts\` (\`id\` varchar(36) NOT NULL, \`date\` date NOT NULL, \`member_id\` varchar(255) NOT NULL, \`type\` varchar(30) NULL, \`notes\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`exercises_equipment_equipment\` (\`exercisesId\` varchar(36) NOT NULL, \`equipmentId\` varchar(36) NOT NULL, INDEX \`IDX_dbc9d42686de073c103432c0c5\` (\`exercisesId\`), INDEX \`IDX_1e026e8623c9128a6f3ac14551\` (\`equipmentId\`), PRIMARY KEY (\`exercisesId\`, \`equipmentId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`measurements\` ADD CONSTRAINT \`FK_dcfffa998a420a3d241fba8e810\` FOREIGN KEY (\`member_id\`) REFERENCES \`members\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`meals\` ADD CONSTRAINT \`FK_82467c8fadd30272f8b884e1de3\` FOREIGN KEY (\`member_id\`) REFERENCES \`members\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exercises\` ADD CONSTRAINT \`FK_7b0c9579a1c0ef6d5bd42f83282\` FOREIGN KEY (\`workout_id\`) REFERENCES \`workouts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workouts\` ADD CONSTRAINT \`FK_dcefe37a24049cbbddfc8bfe288\` FOREIGN KEY (\`member_id\`) REFERENCES \`members\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exercises_equipment_equipment\` ADD CONSTRAINT \`FK_dbc9d42686de073c103432c0c5e\` FOREIGN KEY (\`exercisesId\`) REFERENCES \`exercises\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`exercises_equipment_equipment\` ADD CONSTRAINT \`FK_1e026e8623c9128a6f3ac145515\` FOREIGN KEY (\`equipmentId\`) REFERENCES \`equipment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`exercises_equipment_equipment\` DROP FOREIGN KEY \`FK_1e026e8623c9128a6f3ac145515\``);
        await queryRunner.query(`ALTER TABLE \`exercises_equipment_equipment\` DROP FOREIGN KEY \`FK_dbc9d42686de073c103432c0c5e\``);
        await queryRunner.query(`ALTER TABLE \`workouts\` DROP FOREIGN KEY \`FK_dcefe37a24049cbbddfc8bfe288\``);
        await queryRunner.query(`ALTER TABLE \`exercises\` DROP FOREIGN KEY \`FK_7b0c9579a1c0ef6d5bd42f83282\``);
        await queryRunner.query(`ALTER TABLE \`meals\` DROP FOREIGN KEY \`FK_82467c8fadd30272f8b884e1de3\``);
        await queryRunner.query(`ALTER TABLE \`measurements\` DROP FOREIGN KEY \`FK_dcfffa998a420a3d241fba8e810\``);
        await queryRunner.query(`DROP INDEX \`IDX_1e026e8623c9128a6f3ac14551\` ON \`exercises_equipment_equipment\``);
        await queryRunner.query(`DROP INDEX \`IDX_dbc9d42686de073c103432c0c5\` ON \`exercises_equipment_equipment\``);
        await queryRunner.query(`DROP TABLE \`exercises_equipment_equipment\``);
        await queryRunner.query(`DROP TABLE \`workouts\``);
        await queryRunner.query(`DROP TABLE \`exercises\``);
        await queryRunner.query(`DROP TABLE \`equipment\``);
        await queryRunner.query(`DROP TABLE \`members\``);
        await queryRunner.query(`DROP TABLE \`meals\``);
        await queryRunner.query(`DROP TABLE \`measurements\``);
    }
}
exports.InitialMigration1709831582608 = InitialMigration1709831582608;
