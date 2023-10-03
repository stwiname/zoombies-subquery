// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type NftTransferProps = Omit<NftTransfer, NonNullable<FunctionPropertyNames<NftTransfer>>| '_name'>;

export class NftTransfer implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public network?: number;

    public blockTimestamp: Date;

    public from: string;

    public to: string;

    public tokenId: bigint;


    get _name(): string {
        return 'NftTransfer';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save NftTransfer entity without an ID");
        await store.set('NftTransfer', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove NftTransfer entity without an ID");
        await store.remove('NftTransfer', id.toString());
    }

    static async get(id:string): Promise<NftTransfer | undefined>{
        assert((id !== null && id !== undefined), "Cannot get NftTransfer entity without an ID");
        const record = await store.get('NftTransfer', id.toString());
        if (record){
            return this.create(record as NftTransferProps);
        }else{
            return;
        }
    }



    static create(record: NftTransferProps): NftTransfer {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
