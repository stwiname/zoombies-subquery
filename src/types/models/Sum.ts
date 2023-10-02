// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type SumProps = Omit<Sum, NonNullable<FunctionPropertyNames<Sum>>| '_name'>;

export class Sum implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public mintedTotal?: bigint;

    public burnedTotal?: bigint;


    get _name(): string {
        return 'Sum';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Sum entity without an ID");
        await store.set('Sum', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Sum entity without an ID");
        await store.remove('Sum', id.toString());
    }

    static async get(id:string): Promise<Sum | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Sum entity without an ID");
        const record = await store.get('Sum', id.toString());
        if (record){
            return this.create(record as SumProps);
        }else{
            return;
        }
    }



    static create(record: SumProps): Sum {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
