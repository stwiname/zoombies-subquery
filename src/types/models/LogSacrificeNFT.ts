// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type LogSacrificeNFTProps = Omit<LogSacrificeNFT, NonNullable<FunctionPropertyNames<LogSacrificeNFT>>| '_name'>;

export class LogSacrificeNFT implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public network?: number;

    public blockTimestamp?: Date;

    public owner?: string;

    public tokenId?: bigint;

    public cardTypeId?: bigint;

    public zoomGained?: bigint;


    get _name(): string {
        return 'LogSacrificeNFT';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save LogSacrificeNFT entity without an ID");
        await store.set('LogSacrificeNFT', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove LogSacrificeNFT entity without an ID");
        await store.remove('LogSacrificeNFT', id.toString());
    }

    static async get(id:string): Promise<LogSacrificeNFT | undefined>{
        assert((id !== null && id !== undefined), "Cannot get LogSacrificeNFT entity without an ID");
        const record = await store.get('LogSacrificeNFT', id.toString());
        if (record){
            return this.create(record as LogSacrificeNFTProps);
        }else{
            return;
        }
    }



    static create(record: LogSacrificeNFTProps): LogSacrificeNFT {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
