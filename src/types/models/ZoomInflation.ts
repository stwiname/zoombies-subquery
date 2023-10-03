// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type ZoomInflationProps = Omit<ZoomInflation, NonNullable<FunctionPropertyNames<ZoomInflation>>| '_name'>;

export class ZoomInflation implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public network?: number;

    public total?: bigint;


    get _name(): string {
        return 'ZoomInflation';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save ZoomInflation entity without an ID");
        await store.set('ZoomInflation', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove ZoomInflation entity without an ID");
        await store.remove('ZoomInflation', id.toString());
    }

    static async get(id:string): Promise<ZoomInflation | undefined>{
        assert((id !== null && id !== undefined), "Cannot get ZoomInflation entity without an ID");
        const record = await store.get('ZoomInflation', id.toString());
        if (record){
            return this.create(record as ZoomInflationProps);
        }else{
            return;
        }
    }



    static create(record: ZoomInflationProps): ZoomInflation {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
