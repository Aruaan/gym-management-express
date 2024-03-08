import { Workout } from "../entities/Workout.entity";
import dataSource from "../app-data-source";

export const WorkoutRepository = dataSource.getRepository(Workout).extend({
    async createAndSave (workoutData: Partial<Workout>){
        const newWorkout = this.create(workoutData)
        return await this.save(newWorkout)
    },

    async findAll(): Promise<Workout[]>{
        return await this.find()
    },

    async findById(id:string): Promise<Workout | null> {
        return await this.findOneBy({id})
    },

    async update(id: string, workoutData: Partial<Workout>): Promise<Workout | null> {
        await this.manager.update(Workout, id, workoutData);
        return await this.findById(id); 
    },

    async delete (id:string): Promise<void > {
        await this.manager.delete(Workout, id)
    }
})