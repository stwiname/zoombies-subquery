// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type NftTransferProps = Omit<NftTransfer, NonNullable<FunctionPropertyNames<NftTransfer>>>;

export class NftTransfer implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public from: string;

    public to: string;

    public tokenId: bigint;


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
            return NftTransfer.create(record as NftTransferProps);
        }else{
            return;
        }
    }



    static create(record: NftTransferProps): NftTransfer {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new NftTransfer(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
