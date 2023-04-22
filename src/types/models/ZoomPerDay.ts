// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type ZoomPerDayProps = Omit<ZoomPerDay, NonNullable<FunctionPropertyNames<ZoomPerDay>>| '_name'>;

export class ZoomPerDay implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public minted?: bigint;

    public burned?: bigint;


    get _name(): string {
        return 'ZoomPerDay';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save ZoomPerDay entity without an ID");
        await store.set('ZoomPerDay', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove ZoomPerDay entity without an ID");
        await store.remove('ZoomPerDay', id.toString());
    }

    static async get(id:string): Promise<ZoomPerDay | undefined>{
        assert((id !== null && id !== undefined), "Cannot get ZoomPerDay entity without an ID");
        const record = await store.get('ZoomPerDay', id.toString());
        if (record){
            return this.create(record as ZoomPerDayProps);
        }else{
            return;
        }
    }



    static create(record: ZoomPerDayProps): ZoomPerDay {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
