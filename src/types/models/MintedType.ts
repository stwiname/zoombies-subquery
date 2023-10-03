// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type MintedTypeProps = Omit<MintedType, NonNullable<FunctionPropertyNames<MintedType>>| '_name'>;

export class MintedType implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public network?: number;

    public blockTimestamp: Date;

    public cardTypeId: number;


    get _name(): string {
        return 'MintedType';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save MintedType entity without an ID");
        await store.set('MintedType', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove MintedType entity without an ID");
        await store.remove('MintedType', id.toString());
    }

    static async get(id:string): Promise<MintedType | undefined>{
        assert((id !== null && id !== undefined), "Cannot get MintedType entity without an ID");
        const record = await store.get('MintedType', id.toString());
        if (record){
            return this.create(record as MintedTypeProps);
        }else{
            return;
        }
    }



    static create(record: MintedTypeProps): MintedType {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
