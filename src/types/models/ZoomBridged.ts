// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type ZoomBridgedProps = Omit<ZoomBridged, NonNullable<FunctionPropertyNames<ZoomBridged>>| '_name'>;

export class ZoomBridged implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public network?: number;

    public blockTimestamp?: Date;

    public playerUUID?: string;

    public amount?: bigint;


    get _name(): string {
        return 'ZoomBridged';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save ZoomBridged entity without an ID");
        await store.set('ZoomBridged', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove ZoomBridged entity without an ID");
        await store.remove('ZoomBridged', id.toString());
    }

    static async get(id:string): Promise<ZoomBridged | undefined>{
        assert((id !== null && id !== undefined), "Cannot get ZoomBridged entity without an ID");
        const record = await store.get('ZoomBridged', id.toString());
        if (record){
            return this.create(record as ZoomBridgedProps);
        }else{
            return;
        }
    }



    static create(record: ZoomBridgedProps): ZoomBridged {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
