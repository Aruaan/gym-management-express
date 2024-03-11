import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exercise } from "./Exercise.entity";
import { EquipmentType } from "../enums/Equipment.enum";

@Entity()
export class Equipment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 30, type: "varchar" })
  name: string;

  @Column({type: "enum", enum : EquipmentType})
  type: EquipmentType;

  @CreateDateColumn({ type: "timestamp", nullable: true, name: 'purchase_date' })
  purchaseDate: Date | null;

  @Column({ length: 255, type: "varchar", nullable: true })
  notes: string | null;

  @ManyToMany(() => Exercise, exercise => exercise.equipment)
  exercises?: Exercise[];
}