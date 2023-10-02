// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type BridgedZoomProps = Omit<BridgedZoom, NonNullable<FunctionPropertyNames<BridgedZoom>>| '_name'>;

export class BridgedZoom implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public network?: number;

    public blockNumber?: number;

    public blockTimestamp: Date;

    public tx: string;

    public nakamaUserId: string;

    public amount: bigint;


    get _name(): string {
        return 'BridgedZoom';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save BridgedZoom entity without an ID");
        await store.set('BridgedZoom', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove BridgedZoom entity without an ID");
        await store.remove('BridgedZoom', id.toString());
    }

    static async get(id:string): Promise<BridgedZoom | undefined>{
        assert((id !== null && id !== undefined), "Cannot get BridgedZoom entity without an ID");
        const record = await store.get('BridgedZoom', id.toString());
        if (record){
            return this.create(record as BridgedZoomProps);
        }else{
            return;
        }
    }



    static create(record: BridgedZoomProps): BridgedZoom {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
