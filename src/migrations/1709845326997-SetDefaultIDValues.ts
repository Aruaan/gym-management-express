import { MigrationInterface, QueryRunner } from "typeorm";

export class SetDefaultIDValues1709845326997 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE members ALTER COLUMN id SET DEFAULT (UUID())`);
        await queryRunner.query(`ALTER TABLE measurements ALTER COLUMN id SET DEFAULT (UUID())`);
        await queryRunner.query(`ALTER TABLE workouts ALTER COLUMN id SET DEFAULT (UUID())`);
        await queryRunner.query(`ALTER TABLE meals ALTER COLUMN id SET DEFAULT (UUID())`);
        await queryRunner.query(`ALTER TABLE equipment ALTER COLUMN id SET DEFAULT (UUID())`);
        await queryRunner.query(`ALTER TABLE exercises ALTER COLUMN id SET DEFAULT (UUID())`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
