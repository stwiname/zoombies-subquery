// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type SponsorRewardTotalProps = Omit<SponsorRewardTotal, NonNullable<FunctionPropertyNames<SponsorRewardTotal>>| '_name'>;

export class SponsorRewardTotal implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public network?: number;

    public rewardTotal?: bigint;


    get _name(): string {
        return 'SponsorRewardTotal';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save SponsorRewardTotal entity without an ID");
        await store.set('SponsorRewardTotal', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove SponsorRewardTotal entity without an ID");
        await store.remove('SponsorRewardTotal', id.toString());
    }

    static async get(id:string): Promise<SponsorRewardTotal | undefined>{
        assert((id !== null && id !== undefined), "Cannot get SponsorRewardTotal entity without an ID");
        const record = await store.get('SponsorRewardTotal', id.toString());
        if (record){
            return this.create(record as SponsorRewardTotalProps);
        }else{
            return;
        }
    }



    static create(record: SponsorRewardTotalProps): SponsorRewardTotal {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
