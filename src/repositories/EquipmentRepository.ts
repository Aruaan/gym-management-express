import { Equipment } from "../entities/Equipment.entity";
import dataSource from "../app-data-source";
import { Exercise } from "../entities/Exercise.entity";

export const equipmentRepository = dataSource.getRepository(Equipment).extend({
  async createAndSave (equipmentData: Partial<Equipment>){
    return await this.save(this.create(equipmentData))
},

async findAll(): Promise<Equipment[]>{
    return await this
        .createQueryBuilder('equipment')
        .getMany()
},

async findById(id:string): Promise<Equipment | null> {
    return await this
        .createQueryBuilder('equipment')
        .where('id = :id', { id })
        .getOne()
},

async update(id: string, updateData: Partial<Equipment>): Promise<boolean> {
    return await this
        .createQueryBuilder()
        .update(Equipment)
        .set(updateData)
        .where("id = :id", { id })
        .execute();

},

async delete (id:string): Promise<boolean> {
   return await this
        .createQueryBuilder()
        .delete()
        .from(Equipment)
        .where('id= :id', {id})
        .execute()

},

async findExercisesForEquipment(equipment: Equipment): Promise<Exercise[]> {
  return await this
      .createQueryBuilder("equipment")
      .leftJoinAndSelect("equipment.exercises", "exercise")
      .where("equipment.id = :id", { id: equipment.id })
      .getMany(); 
}
})

