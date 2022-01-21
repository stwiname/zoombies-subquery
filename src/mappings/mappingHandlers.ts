import {LogSponsorLinkedEntity, TransferEntity, LogCardTypeLoadedEntity, LogCardMintedEntity, LogPackOpenedEntity, LogSponsorRewardEntity, LogDailyRewardEntity, LogRewardBoostersEntity, LogSacrificeNFTEntity} from "../types";
import { MoonbeamEvent } from '@subql/contract-processors/dist/moonbeam';
import { BigNumber } from "ethers";

// Setup types from ZoombiesABI
/**
LogCardTypeLoaded(uint32 indexed cardTypeId, string cardName, uint editionTotal);
LogCardMinted(address indexed buyer, uint tokenId, uint32 indexed cardTypeId, uint editionNumber);
LogPackOpened(address indexed buyer, uint8 rarity);
LogSponsorLinked(address sponsor, address affiliate);
LogSponsorReward(address sponsor, address affiliate, uint zoomReward);
LogDailyReward(address player, uint newBoosterBalance);
LogRewardBoosters(address winner, uint boostersAwarded);
LogSacrificeNFT(address owner, uint256 tokenId, uint16 cardTypeId, uint256 zoomGained);
Transfer(address indexed from, address indexed to, uint256 indexed tokenId); // standard event
 */
type LogCardTypeLoadedEventArgs = [number, string, BigNumber] & { cardTypeId: number; cardName: string; editionTotal: BigNumber; };
type LogCardMintedEventArgs = [string, BigNumber, number, BigNumber] & { buyer: string; tokenId: BigNumber; cardTypeId: number ; editionNumber: BigNumber; };
type LogPackOpenedEventArgs = [string, number] & { buyer: string; rarity: number; };
type LogSponsorLinkedEventArgs = [string, string] & { sponsor: string; affiliate: string; };
type LogSponsorRewardEventArgs = [string, string, BigNumber] & { sponsor: string; affiliate: string; zoomReward: BigNumber; };
type LogDailyRewardEventArgs = [string, BigNumber] & { player: string; newBoosterBalance: BigNumber; };
type LogRewardBoostersEventArgs = [string, BigNumber] & { winner: string; boostersAwarded: BigNumber; };
type LogSacrificeNFTEventArgs = [string, BigNumber, number, BigNumber] & { owner: string; tokenId: BigNumber; cardTypeId: number; zoomGained: BigNumber; };
type TransferEventArgs = [string, string, BigNumber] & { from: string; to: string; tokenId: BigNumber; };

// LogCardTypeLoaded(uint32 indexed cardTypeId, string cardName, uint editionTotal);

export async function handleLogCardTypeLoadedEvent(event: MoonbeamEvent<LogCardTypeLoadedEventArgs>): Promise<void> {
    logger.info("Chai log info handleLogCardTypeLoadedEvent start!");
    const logCardTypeLoaded = new LogCardTypeLoadedEntity(event.transactionHash);
    logger.info("Chai log info handleLogCardTypeLoadedEvent start1!");

    logCardTypeLoaded.cardTypeId = event.args.cardTypeId;
    logger.info("Chai log info handleLogCardTypeLoadedEvent start2!");
    logCardTypeLoaded.cardName = event.args.cardName;
    logger.info("Chai log info handleLogCardTypeLoadedEvent start!3");
    logCardTypeLoaded.editionTotal = event.args.editionTotal.toBigInt();
    logger.info("Chai log info handleLogCardTypeLoadedEvent start!4");

	await logCardTypeLoaded.save();
    logger.info("Chai log info handleLogCardTypeLoadedEvent end!");
}

// LogCardMinted(address indexed buyer, uint tokenId, uint32 indexed cardTypeId, uint editionNumber);

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

// LogPackOpened(address indexed buyer, uint8 rarity);

export async function handleLogPackOpenedEvent(event: MoonbeamEvent<LogPackOpenedEventArgs>): Promise<void> {
    logger.info("Chai log info handleLogPackOpenedEvent start!");
	const logPackOpened = new LogPackOpenedEntity(event.transactionHash);

    logger.info("Chai log info handleLogPackOpenedEvent start!1");
    logPackOpened.buyer = event.args.buyer;
    logger.info("Chai log info handleLogPackOpenedEvent start!2");
    logPackOpened.rarity = event.args.rarity;

    logger.info("Chai log info handleLogPackOpenedEvent start!3");
	await logPackOpened.save();
    logger.info("Chai log info handleLogPackOpenedEvent end!");
}

// LogSponsorLinked(address sponsor, address affiliate);

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

// LogSponsorReward(address sponsor, address affiliate, uint zoomReward);

export async function handleLogSponsorRewardEvent(event: MoonbeamEvent<LogSponsorRewardEventArgs>): Promise<void> {
    logger.info("Chai log info handleLogSponsorRewardEvent start!");
	const logSponsorReward = new LogSponsorRewardEntity(event.transactionHash);

    logger.info("Chai log info handleLogSponsorRewardEvent start!1");
    logSponsorReward.sponsor = event.args.sponsor;
    logger.info("Chai log info handleLogSponsorRewardEvent start!2");
    logSponsorReward.affiliate = event.args.affiliate;
    logger.info("Chai log info handleLogSponsorRewardEvent start!3");
    logSponsorReward.zoomReward = event.args.zoomReward.toBigInt();

    logger.info("Chai log info handleLogSponsorRewardEvent start!4");
	await logSponsorReward.save();
    logger.info("Chai log info handleLogSponsorRewardEvent end!");
}

// LogDailyReward(address player, uint newBoosterBalance);

export async function handleLogDailyRewardEvent(event: MoonbeamEvent<LogDailyRewardEventArgs>): Promise<void> {
    logger.info("Chai log info handleLogDailyRewardEvent start!");
    const logDailyReward = new LogDailyRewardEntity(event.transactionHash);

    logger.info("Chai log info handleLogDailyRewardEvent start!1");
    logDailyReward.player = event.args.player;
    logger.info("Chai log info handleLogDailyRewardEvent start!2");
    logDailyReward.newBoosterBalance = event.args.newBoosterBalance.toBigInt();

    logger.info("Chai log info handleLogDailyRewardEvent start!3");
	await logDailyReward.save();
    logger.info("Chai log info handleLogDailyRewardEvent end!");
}

// LogRewardBoosters(address winner, uint boostersAwarded);

export async function handleLogRewardBoostersEvent(event: MoonbeamEvent<LogRewardBoostersEventArgs>): Promise<void> {
    logger.info("Chai log info handleLogRewardBoostersEvent start!");
    const logRewardBoosters = new LogRewardBoostersEntity(event.transactionHash);

    logger.info("Chai log info handleLogRewardBoostersEvent start!1");
    logRewardBoosters.winner = event.args.winner;
    logger.info("Chai log info handleLogRewardBoostersEvent start!2");
    logRewardBoosters.boostersAwarded = event.args.boostersAwarded.toBigInt();

    logger.info("Chai log info handleLogRewardBoostersEvent start!3");
    await logRewardBoosters.save();
    logger.info("Chai log info handleLogRewardBoostersEvent end!");
}

// LogSacrificeNFT(address owner, uint256 tokenId, uint16 cardTypeId, uint256 zoomGained);

export async function handleLogSacrificeNFTEvent(event: MoonbeamEvent<LogSacrificeNFTEventArgs>): Promise<void> {
    logger.info("Chai log info handleLogSacrificeNFTEvent start!");
	const logSacrificeNFT = new LogSacrificeNFTEntity(event.transactionHash);

    logger.info("Chai log info handleLogSacrificeNFTEvent start!1");
    logSacrificeNFT.owner = event.args.owner;
    logger.info("Chai log info handleLogSacrificeNFTEvent start!2");
    logSacrificeNFT.tokenId = event.args.tokenId.toBigInt();
    logger.info("Chai log info handleLogSacrificeNFTEvent start!3");
    logSacrificeNFT.cardTypeId = event.args.cardTypeId;
    logger.info("Chai log info handleLogSacrificeNFTEvent start!4");
    logSacrificeNFT.zoomGained = event.args.zoomGained.toBigInt();

    logger.info("Chai log info handleLogSacrificeNFTEvent start!5");
	await logSacrificeNFT.save();
    logger.info("Chai log info handleLogSacrificeNFTEvent end!");
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
