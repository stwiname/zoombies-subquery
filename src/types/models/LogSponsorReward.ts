// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type LogSponsorRewardProps = Omit<LogSponsorReward, NonNullable<FunctionPropertyNames<LogSponsorReward>>| '_name'>;

export class LogSponsorReward implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public network?: number;

    public blockTimestamp?: Date;

    public sponsor?: string;

    public affiliate?: string;

    public zoomReward?: bigint;


    get _name(): string {
        return 'LogSponsorReward';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save LogSponsorReward entity without an ID");
        await store.set('LogSponsorReward', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove LogSponsorReward entity without an ID");
        await store.remove('LogSponsorReward', id.toString());
    }

    static async get(id:string): Promise<LogSponsorReward | undefined>{
        assert((id !== null && id !== undefined), "Cannot get LogSponsorReward entity without an ID");
        const record = await store.get('LogSponsorReward', id.toString());
        if (record){
            return this.create(record as LogSponsorRewardProps);
        }else{
            return;
        }
    }



    static create(record: LogSponsorRewardProps): LogSponsorReward {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
