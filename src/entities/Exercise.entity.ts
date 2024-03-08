import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Workout } from "./Workout.entity";
import { Equipment } from "./Equipment.entity";
export enum ExerciseType {
  STRENGTH = 'strength',
  CARDIO = 'cardio',
  HYPERTROPHY = 'hypertrophy'
}

@Entity({name:'exercises'})
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'workout_id' })
  workoutId: string;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: 'enum', enum: ExerciseType, nullable: true})
  type: ExerciseType | null;

  @Column({ length: 255, type: "varchar", nullable: true })
  notes: string | null ;

  @ManyToOne(() => Workout, workout => workout.exercise)
  @JoinColumn({ name: 'workout_id', referencedColumnName: 'id' })
  workout?: Workout = new Workout;

  @ManyToMany(() => Equipment, equipment => equipment.exercises)
  @JoinTable()
  equipment?: Equipment[];
}