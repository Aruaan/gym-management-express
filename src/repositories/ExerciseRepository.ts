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
    return await this
        .createQueryBuilder('exercises')
        .getMany()
},

async findById(id:string): Promise<Exercise | null> {
    return await this
        .createQueryBuilder('exercises')
        .where('id = :id', { id })
        .getOne()
},

async update(id: string, updateData: Partial<Exercise>): Promise<boolean> {
    return await this
        .createQueryBuilder()
        .update(Exercise)
        .set(updateData)
        .where("id = :id", { id })
        .execute();

},

async delete (id:string): Promise<boolean> {
   return await this
        .createQueryBuilder()
        .delete()
        .from(Exercise)
        .where('id= :id', {id})
        .execute()

},

async findEquipmentForExercise(exercise: Exercise): Promise<Equipment[]> {
    return await this.createQueryBuilder(exerciseAlias)
        .leftJoinAndSelect("exercise.equipment", equipmentAlias)
        .where(`${exerciseAlias}.id = :id`, { id: exercise.id })
        .getMany(); 
  }

})
