import { Member } from "../entities/Member.entity";
import dataSource from "../app-data-source";

export const MemberRepository = dataSource.getRepository(Member).extend({
    async createAndSave (memberData: Partial<Member>){
        const newMember = this.create(memberData)
        return await this.save(newMember)
    },

    async findAll(): Promise<Member[]>{
        return await this.find()
    },

    async findById(id:string): Promise<Member | null> {
        return await this.findOneBy({id})
    },

    async update(id: string, memberData: Partial<Member>): Promise<Member | null> {
        await this.manager.update(Member, id, memberData);
        return await this.findById(id); 
    },

    async delete (id:string): Promise<void > {
        await this.manager.delete(Member,id)
    }
})