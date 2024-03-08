import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exercise } from "./Exercise.entity";

export enum EquipmentType {
  BARBELL = 'barbell',
  DUMBBELL = 'dumbbell',
  MACHINE = 'machine',
  CARDIO = 'cardio'
}

@Entity()
export class Equipment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 30, type: "varchar" })
  name: string;

  @Column({type: "enum", enum : EquipmentType})
  type: EquipmentType;

  @Column({ type: "date", nullable: true, name: 'purchase_date' })
  purchaseDate: Date | null;

  @Column({ length: 255, type: "varchar", nullable: true })
  notes: string | null;

  @ManyToMany(() => Exercise, exercise => exercise.equipment)
  exercises?: Exercise[];
}