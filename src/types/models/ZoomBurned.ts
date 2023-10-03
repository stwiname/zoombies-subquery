// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type ZoomBurnedProps = Omit<ZoomBurned, NonNullable<FunctionPropertyNames<ZoomBurned>>| '_name'>;

export class ZoomBurned implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public network?: number;

    public blockTimestamp: Date;

    public owner: string;

    public totalZoomBurned?: bigint;

    public zoomBurned?: bigint;


    get _name(): string {
        return 'ZoomBurned';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save ZoomBurned entity without an ID");
        await store.set('ZoomBurned', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove ZoomBurned entity without an ID");
        await store.remove('ZoomBurned', id.toString());
    }

    static async get(id:string): Promise<ZoomBurned | undefined>{
        assert((id !== null && id !== undefined), "Cannot get ZoomBurned entity without an ID");
        const record = await store.get('ZoomBurned', id.toString());
        if (record){
            return this.create(record as ZoomBurnedProps);
        }else{
            return;
        }
    }



    static create(record: ZoomBurnedProps): ZoomBurned {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
