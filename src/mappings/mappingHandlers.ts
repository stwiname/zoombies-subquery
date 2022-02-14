import {Transaction} from "../types";
import { MoonbeamEvent} from '@subql/contract-processors/dist/moonbeam';
import { BigNumber } from "ethers";

// Setup types from ABI
type TransferEventArgs = [string, string, BigNumber] & { from: string; to: string; value: BigNumber; };

export async function handleMoonriverEvent(event: MoonbeamEvent<TransferEventArgs>): Promise<void> {
    const transaction = new Transaction(event.transactionHash);
    transaction.blockNumber = Math.trunc(event.blockNumber);
    transaction.blockTimestamp = event.blockTimestamp;
    transaction.value = event.args.value.toBigInt();
    transaction.from = event.args.from;
    transaction.to = event.args.to;
    transaction.contractAddress = event.address;

    await transaction.save();
}
