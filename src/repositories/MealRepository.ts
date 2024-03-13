import { Meal } from "../entities/Meal.entity";
import dataSource from "../app-data-source";

export const mealRepository = dataSource.getRepository(Meal).extend({

async createAndSave (mealData: Partial<Meal>){
    return await this.save(this.create(mealData))
},

async findAll(): Promise<Meal[]>{
    return await this
        .createQueryBuilder('meals')
        .getMany()
},

async findById(id:string): Promise<Meal | null> {
    return await this
        .createQueryBuilder('meals')
        .where('id = :id', { id })
        .getOne()
},

async update(id: string, updateData: Partial<Meal>): Promise<boolean> {
    return await this
        .createQueryBuilder()
        .update(Meal)
        .set(updateData)
        .where("id = :id", { id })
        .execute();

},

async delete (id:string): Promise<boolean> {
   return await this
        .createQueryBuilder()
        .delete()
        .from(Meal)
        .where('id= :id', {id})
        .execute()

}
})
