import { Workout } from "../entities/Workout.entity";
import dataSource from "../app-data-source";

export const WorkoutRepository = dataSource.getRepository(Workout).extend({
    async createAndSave (workoutData: Partial<Workout>){
        return await this.save(this.create(workoutData))
    },

    async findAll(): Promise<Workout[]>{
        return await this
            .createQueryBuilder('workouts')
            .getMany()
    },
    
    async findById(id:string): Promise<Workout | null> {
        return await this
            .createQueryBuilder('workouts')
            .where('id = :id', { id })
            .getOne()
    },
    
    async update(id: string, updateData: Partial<Workout>): Promise<boolean> {
        return await this
            .createQueryBuilder()
            .update(Workout)
            .set(updateData)
            .where("id = :id", { id })
            .execute();
    
    },
    
    async delete (id:string): Promise<boolean> {
        return await this
             .createQueryBuilder()
             .delete()
             .from(Workout)
             .where('id= :id', {id})
             .execute()
     
     },
})