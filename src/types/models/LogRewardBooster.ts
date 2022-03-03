// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type LogRewardBoosterProps = Omit<LogRewardBooster, NonNullable<FunctionPropertyNames<LogRewardBooster>>>;

export class LogRewardBooster implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public blockNumber?: number;

    public blockTimestamp: Date;

    public winner: string;

    public boostersAwarded: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save LogRewardBooster entity without an ID");
        await store.set('LogRewardBooster', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove LogRewardBooster entity without an ID");
        await store.remove('LogRewardBooster', id.toString());
    }

    static async get(id:string): Promise<LogRewardBooster | undefined>{
        assert((id !== null && id !== undefined), "Cannot get LogRewardBooster entity without an ID");
        const record = await store.get('LogRewardBooster', id.toString());
        if (record){
            return LogRewardBooster.create(record as LogRewardBoosterProps);
        }else{
            return;
        }
    }



    static create(record: LogRewardBoosterProps): LogRewardBooster {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new LogRewardBooster(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
