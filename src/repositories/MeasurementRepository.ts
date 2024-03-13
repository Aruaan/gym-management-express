import { Measurement } from "../entities/Measurement.entity";
import dataSource from "../app-data-source";

export const measurementRepository = dataSource.getRepository(Measurement).extend({

async createAndSave (measurementData: Partial<Measurement>){
    return await this.save(this.create(measurementData))
},

async findAll(): Promise<Measurement[]>{
    return await this
        .createQueryBuilder('measurements')
        .getMany()
},

async findById(id:string): Promise<Measurement | null> {
    return await this
        .createQueryBuilder('measurements')
        .where('id = :id', { id })
        .getOne()
},

async update(id: string, updateData: Partial<Measurement>): Promise<boolean> {
    return await this
        .createQueryBuilder()
        .update(Measurement)
        .set(updateData)
        .where("id = :id", { id })
        .execute();

},

async delete (id:string): Promise<boolean> {
   return await this
        .createQueryBuilder()
        .delete()
        .from(Measurement)
        .where('id= :id', {id})
        .execute()

}
})
