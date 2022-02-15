import {Transaction,Sum} from "../types";
import { MoonbeamEvent} from '@subql/contract-processors/dist/moonbeam';
import { BigNumber } from "ethers";

// Setup types from ABI
type TransferEventArgs = [string, string, BigNumber] & { from: string; to: string; value: BigNumber; };

function createSum(id: string): Sum {
  const entity = new Sum(id);
  entity.mintedTotal = BigInt(0);
  entity.burnedTotal = BigInt(0);
  return entity;
}


export async function handleMoonriverEvent(event: MoonbeamEvent<TransferEventArgs>): Promise<void> {
    const transaction = new Transaction(event.transactionHash);
    transaction.blockNumber = Math.trunc(event.blockNumber);
    transaction.blockTimestamp = event.blockTimestamp;
    transaction.value = event.args.value.toBigInt();
    transaction.from = event.args.from;
    transaction.to = event.args.to;
    transaction.contractAddress = event.address;
    await transaction.save();

    let entity = await Sum.get("1");
    if(entity === undefined){
      entity = createSum("1");
    }

    if(transaction.from == "0x0000000000000000000000000000000000000000") {
      logger.info("logger.info:::::::L:L");
      logger.info(entity.mintedTotal);
        entity.mintedTotal = BigInt(entity.mintedTotal) + event.args.value.toBigInt();
    }
    if(transaction.to == "0x0000000000000000000000000000000000000000") {
      entity.burnedTotal = BigInt(entity.burnedTotal) + event.args.value.toBigInt();
    }

    await entity.save();
}
