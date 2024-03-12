import { Exercise } from "../entities/Exercise.entity";
import dataSource from "../app-data-source";
import { Equipment } from "../entities/Equipment.entity";

export const exerciseAlias = 'exercise'
export const equipmentAlias = 'equipment'
export const exerciseRepository = dataSource.getRepository(Exercise).extend({
  

async createAndSave (exerciseData: Partial<Exercise>){
    return await this.save(this.create(exerciseData))
},

async findAll(): Promise<Exercise[]>{
    return await this.find()
},

async findById(id:string): Promise<Exercise | null> {
    return await this.findOneBy({id})
},

async update(id: string, exerciseData: Partial<Exercise>): Promise<void> {
    await this.manager.update(Exercise, id, exerciseData);
},

async delete (id:string): Promise<void> {
    await this.manager.delete(Exercise, id)
},

async findEquipmentForExercise(exercise: Exercise): Promise<Equipment[]> {
    return await this.createQueryBuilder(exerciseAlias)
        .leftJoinAndSelect("exercise.equipment", equipmentAlias)
        .where(`${exerciseAlias}.id = :id`, { id: exercise.id })
        .getMany(); 
  }

})
