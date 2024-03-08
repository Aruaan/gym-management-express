import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Member } from "./Member.entity";
import { Exercise } from "./Exercise.entity";
export enum WorkoutType {
  STRENGTH = 'strength',
  CARDIO = 'cardio',
  HYPERTROPHY = 'hypertrophy',
  ENDURANCE = 'endurance',
  POWERBUILDING = 'powerbuilding'
}
@Entity({name:'workouts'})
export class Workout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'uuid', name: 'member_id' })
  memberId: string;

  @Column({ type: 'enum', enum: WorkoutType, nullable: true })
  type: WorkoutType | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  notes: string | null;

  @ManyToOne(() => Member, member => member.workouts)
  @JoinColumn({ name: 'member_id', referencedColumnName: 'id' })
  member?: Member;

  @OneToMany(() => Exercise, exercise => exercise.workout)
  exercise?: Exercise[];

}