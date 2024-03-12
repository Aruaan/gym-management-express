import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Workout } from "./Workout.entity";
import { Equipment } from "./Equipment.entity";
import { ExerciseType } from "../enums/Exercise.enum";

@Entity({name:'exercises'})
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type:'uuid', name: 'workout_id' })
  workoutId: string;

  @CreateDateColumn({ type: "timestamp", name: 'created_at' })
  createdAt: Date;

  @Column({type: 'varchar', length:40})
  name: string

  @Column({ type: 'enum', enum: ExerciseType, nullable: true})
  type: ExerciseType | null;

  @Column({type: 'int', name: 'set_count'})
  setCount: number;

  @Column({type: 'int', name: 'rep_count'})
  repCount: number;

  @Column({type: 'decimal', precision: 5, scale: 2})
  weight: number;  

  @Column({ length: 255, type: "varchar", nullable: true })
  notes: string | null ;

  @ManyToOne(() => Workout, workout => workout.exercises)
  @JoinColumn({ name: 'workout_id', referencedColumnName: 'id' })
  workout?: Workout;

  @ManyToMany(() => Equipment, equipment => equipment.exercises)
  @JoinTable()
  equipment?: Equipment[];
}