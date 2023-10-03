// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type SponsorAffiliateCountProps = Omit<SponsorAffiliateCount, NonNullable<FunctionPropertyNames<SponsorAffiliateCount>>| '_name'>;

export class SponsorAffiliateCount implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public network?: number;

    public affiliateCount?: bigint;


    get _name(): string {
        return 'SponsorAffiliateCount';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save SponsorAffiliateCount entity without an ID");
        await store.set('SponsorAffiliateCount', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove SponsorAffiliateCount entity without an ID");
        await store.remove('SponsorAffiliateCount', id.toString());
    }

    static async get(id:string): Promise<SponsorAffiliateCount | undefined>{
        assert((id !== null && id !== undefined), "Cannot get SponsorAffiliateCount entity without an ID");
        const record = await store.get('SponsorAffiliateCount', id.toString());
        if (record){
            return this.create(record as SponsorAffiliateCountProps);
        }else{
            return;
        }
    }



    static create(record: SponsorAffiliateCountProps): SponsorAffiliateCount {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
