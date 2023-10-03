// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type LogSponsorLinkedProps = Omit<LogSponsorLinked, NonNullable<FunctionPropertyNames<LogSponsorLinked>>| '_name'>;

export class LogSponsorLinked implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public network?: number;

    public blockTimestamp: Date;

    public sponsor: string;

    public affiliate: string;


    get _name(): string {
        return 'LogSponsorLinked';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save LogSponsorLinked entity without an ID");
        await store.set('LogSponsorLinked', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove LogSponsorLinked entity without an ID");
        await store.remove('LogSponsorLinked', id.toString());
    }

    static async get(id:string): Promise<LogSponsorLinked | undefined>{
        assert((id !== null && id !== undefined), "Cannot get LogSponsorLinked entity without an ID");
        const record = await store.get('LogSponsorLinked', id.toString());
        if (record){
            return this.create(record as LogSponsorLinkedProps);
        }else{
            return;
        }
    }



    static create(record: LogSponsorLinkedProps): LogSponsorLinked {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
