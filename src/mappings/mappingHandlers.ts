import {LogSponsorLinkedEntity, TransferEntity, LogCardMintedEntity} from "../types";
import { MoonbeamEvent } from '@subql/contract-processors/dist/moonbeam';
import { BigNumber } from "ethers";

type TransferEventArgs = [string, string, BigNumber] & { from: string; to: string; tokenId: BigNumber; };
type LogSponsorLinkedEventArgs = [string, string] & { sponsor: string; affiliate: string; };
type LogCardMintedEventArgs = [string, BigNumber, number, BigNumber] & { buyer: string; tokenId: BigNumber; cardTypeId: number ; editionNumber: BigNumber; };

export async function handleLogSponsorLinkedEvent(event: MoonbeamEvent<LogSponsorLinkedEventArgs>): Promise<void> {
    logger.warn("Chai log info handleLogSponsorLinkedEvent start!");
	const logSponsorLinked_value = new LogSponsorLinkedEntity(event.transactionHash);

    logger.warn("Chai log info handleLogSponsorLinkedEvent start1!");
    logSponsorLinked_value.sponsor = event.args.sponsor;
    logger.warn("Chai log info handleLogSponsorLinkedEvent start2!");
    logSponsorLinked_value.affiliate = event.args.affiliate;
    logger.warn("Chai log info handleLogSponsorLinkedEvent start3!");

	await logSponsorLinked_value.save();
    logger.warn("Chai log info handleLogSponsorLinkedEvent end!");
}

export async function handleTransferEvent(event: MoonbeamEvent<TransferEventArgs>): Promise<void> {
    logger.warn("Chai log info handleTransferEvent start!");
	const transferEntity_value = new TransferEntity(event.transactionHash);

    logger.warn("Chai log info handleTransferEvent start1!");
    transferEntity_value.from = event.args.from;
    logger.warn("Chai log info handleTransferEvent start2!");
    transferEntity_value.to = event.args.to;
    logger.warn("Chai log info handleTransferEvent start3!");
    transferEntity_value.tokenId = event.args.tokenId.toBigInt();
    logger.warn("Chai log info handleTransferEvent start4!");

	await transferEntity_value.save();
    logger.warn("Chai log info handleTransferEvent end!");
}

export async function handleLogCardMintedEvent(event: MoonbeamEvent<LogCardMintedEventArgs>): Promise<void> {
    logger.warn("Chai log info handleLogCardMintedEvent start!");
	const logCardMintedEntity_value = new LogCardMintedEntity(event.transactionHash);

    logger.warn("Chai log info handleLogCardMintedEvent start1!");
    logCardMintedEntity_value.buyer = event.args.buyer;
    logger.warn("Chai log info handleLogCardMintedEvent start2!");
    logCardMintedEntity_value.cardTypeId = event.args.cardTypeId;
    logger.warn("Chai log info handleLogCardMintedEvent start3!");
    logCardMintedEntity_value.tokenId = event.args.tokenId.toBigInt();
    logger.warn("Chai log info handleLogCardMintedEvent start4!");
    logCardMintedEntity_value.editionNumber = event.args.editionNumber.toBigInt();
    logger.warn("Chai log info handleLogCardMintedEvent start5!");

	await logCardMintedEntity_value.save();
    logger.warn("Chai log info handleLogCardMintedEvent end!");
}
