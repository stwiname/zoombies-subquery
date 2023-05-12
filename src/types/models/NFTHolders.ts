// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type NFTHoldersProps = Omit<NFTHolders, NonNullable<FunctionPropertyNames<NFTHolders>>| '_name'>;

export class NFTHolders implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;


    get _name(): string {
        return 'NFTHolders';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save NFTHolders entity without an ID");
        await store.set('NFTHolders', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove NFTHolders entity without an ID");
        await store.remove('NFTHolders', id.toString());
    }

    static async get(id:string): Promise<NFTHolders | undefined>{
        assert((id !== null && id !== undefined), "Cannot get NFTHolders entity without an ID");
        const record = await store.get('NFTHolders', id.toString());
        if (record){
            return this.create(record as NFTHoldersProps);
        }else{
            return;
        }
    }



    static create(record: NFTHoldersProps): NFTHolders {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
