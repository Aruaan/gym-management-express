import { Equipment } from "../entities/Equipment.entity";
import dataSource from "../app-data-source";
import { Exercise } from "../entities/Exercise.entity";
import { equipmentAlias, exerciseAlias } from "./ExerciseRepository";
export const equipmentRepository = dataSource.getRepository(Equipment).extend({
  async createAndSave (equipmentData: Partial<Equipment>){
    return await this.save(this.create(equipmentData))
},

async findAll(): Promise<Equipment[]>{
    return await this.find()
},

async findById(id:string): Promise<Equipment | null> {
    return await this.findOneBy({id})
},

async update(id: string, exerciseData: Partial<Equipment>): Promise<void> {
    await this.manager.update(Equipment, id, exerciseData);
},

async delete (id:string): Promise<void> {
    await this.manager.delete(Equipment, id)
},

async findExercisesForEquipment(equipment: Equipment): Promise<Exercise[]> {
  return await this.createQueryBuilder(equipmentAlias)
      .leftJoinAndSelect("equipment.exercises", exerciseAlias)
      .where(`${equipmentAlias}.id = :id`, { id: equipment.id })
      .getMany(); 
}
})

