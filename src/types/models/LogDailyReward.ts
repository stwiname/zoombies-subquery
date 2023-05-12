// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type LogDailyRewardProps = Omit<LogDailyReward, NonNullable<FunctionPropertyNames<LogDailyReward>>| '_name'>;

export class LogDailyReward implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public blockNumber?: number;

    public blockTimestamp: Date;

    public player: string;

    public newBoosterBalance: bigint;


    get _name(): string {
        return 'LogDailyReward';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save LogDailyReward entity without an ID");
        await store.set('LogDailyReward', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove LogDailyReward entity without an ID");
        await store.remove('LogDailyReward', id.toString());
    }

    static async get(id:string): Promise<LogDailyReward | undefined>{
        assert((id !== null && id !== undefined), "Cannot get LogDailyReward entity without an ID");
        const record = await store.get('LogDailyReward', id.toString());
        if (record){
            return this.create(record as LogDailyRewardProps);
        }else{
            return;
        }
    }



    static create(record: LogDailyRewardProps): LogDailyReward {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
