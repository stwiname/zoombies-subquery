// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type ZoomScoreUpdatedProps = Omit<ZoomScoreUpdated, NonNullable<FunctionPropertyNames<ZoomScoreUpdated>>| '_name'>;

export class ZoomScoreUpdated implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public blockNumber?: number;

    public blockTimestamp: Date;

    public owner: string;

    public newZoomScore?: bigint;

    public zoomGained?: bigint;


    get _name(): string {
        return 'ZoomScoreUpdated';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save ZoomScoreUpdated entity without an ID");
        await store.set('ZoomScoreUpdated', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove ZoomScoreUpdated entity without an ID");
        await store.remove('ZoomScoreUpdated', id.toString());
    }

    static async get(id:string): Promise<ZoomScoreUpdated | undefined>{
        assert((id !== null && id !== undefined), "Cannot get ZoomScoreUpdated entity without an ID");
        const record = await store.get('ZoomScoreUpdated', id.toString());
        if (record){
            return this.create(record as ZoomScoreUpdatedProps);
        }else{
            return;
        }
    }



    static create(record: ZoomScoreUpdatedProps): ZoomScoreUpdated {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
