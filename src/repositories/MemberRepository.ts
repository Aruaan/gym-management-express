import { Member } from "../entities/Member.entity";
import dataSource from "../app-data-source";

export const MemberRepository = dataSource.getRepository(Member).extend({
    async createAndSave (memberData: Partial<Member>){
        return await this.save(this.create(memberData))
    },

    async findAll(): Promise<Member[]>{
        return await this
            .createQueryBuilder('members')
            .getMany()
    },
    
    async findById(id:string): Promise<Member | null> {
        return await this
            .createQueryBuilder('members')
            .where('id = :id', { id })
            .getOne()
    },
    
    async update(id: string, updateData: Partial<Member>): Promise<boolean> {
        return await this
            .createQueryBuilder()
            .update(Member)
            .set(updateData)
            .where("id = :id", { id })
            .execute();
    
    },
    
    async delete (id:string): Promise<boolean> {
        return await this
             .createQueryBuilder()
             .delete()
             .from(Member)
             .where('id= :id', {id})
             .execute()
     },
})