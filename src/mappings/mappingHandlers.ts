import {LogCardTypeLoaded, LogCardMinted, LogPackOpened, LogSponsorLinked, LogSponsorReward, LogDailyReward, LogRewardBoosters, LogSacrificeNFT} from "../types";
import { MoonbeamEvent, MoonbeamCall } from '@subql/contract-processors/dist/moonbeam';
import { BigNumber, logger } from "ethers";

// Setup types from ABI
// type TransferEventArgs = [string, string, BigNumber] & { from: string; to: string; value: BigNumber; };
// type ApproveCallArgs = [string, BigNumber] & { _spender: string; _value: BigNumber; }

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
 */
type LogCardTypeLoadedEventArgs = [BigNumber, string, BigNumber] & { cardTypeId: BigNumber; cardName: string; editionTotal: BigNumber; };
type LogCardMintedEventArgs = [string, BigNumber, BigNumber, BigNumber] & { buyer: string; tokenId: BigNumber; cardTypeId: BigNumber; editionNumber: BigNumber; };
type LogPackOpenedEventArgs = [string, BigNumber] & { buyer: string; rarity: BigNumber; };
type LogSponsorLinkedEventArgs = [string, string] & { sponsor: string; affiliate: string; };
type LogSponsorRewardEventArgs = [string, string, BigNumber] & { sponsor: string; affiliate: string; zoomReward: BigNumber; };
type LogDailyRewardEventArgs = [string, BigNumber] & { player: string; newBoosterBalance: BigNumber; };
type LogRewardBoostersEventArgs = [string, BigNumber] & { winner: string; boostersAwarded: BigNumber; };
type LogSacrificeNFTEventArgs = [string, BigNumber, BigNumber, BigNumber] & { owner: string; tokenId: BigNumber; cardTypeId: BigNumber; zoomGained: BigNumber; };

// export async function handleMoonriverEvent(event: MoonbeamEvent<TransferEventArgs>): Promise<void> {
//     const transaction = new Transaction(event.transactionHash);

//     transaction.value = event.args.value.toBigInt();
//     transaction.from = event.args.from;
//     transaction.to = event.args.to;
//     transaction.contractAddress = event.address;

//     await transaction.save();
// }

// export async function handleMoonriverCall(event: MoonbeamCall<ApproveCallArgs>): Promise<void> {
//     const approval = new Approval(event.hash);

//     approval.owner = event.from;
//     approval.value = event.args._value.toBigInt();
//     approval.spender = event.args._spender;
//     approval.contractAddress = event.to;

//     await approval.save();
// }

// LogCardTypeLoaded(uint32 indexed cardTypeId, string cardName, uint editionTotal);

export async function handleLogCardTypeLoadedEvent(event: MoonbeamEvent<LogCardTypeLoadedEventArgs>): Promise<void> {
    logger.info("Chai log info handleLogCardTypeLoadedEvent start!");
    const logCardTypeLoaded = new LogCardTypeLoaded(event.transactionHash);

    logCardTypeLoaded.cardTypeId = event.args.cardTypeId.toBigInt();
    logCardTypeLoaded.cardName = event.args.cardName;
    logCardTypeLoaded.editionTotal = event.args.editionTotal.toBigInt();

	await logCardTypeLoaded.save();
    logger.info("Chai log info handleLogCardTypeLoadedEvent end!");
}

// LogCardMinted(address indexed buyer, uint tokenId, uint32 indexed cardTypeId, uint editionNumber);

export async function handleLogCardMintedEvent(event: MoonbeamEvent<LogCardMintedEventArgs>): Promise<void> {
    logger.info("Chai log info handleLogCardMintedEvent start!");
    const logCardMinted = new LogCardMinted(event.transactionHash);

    logCardMinted.buyer = event.args.buyer;
    logCardMinted.tokenId = event.args.tokenId.toBigInt();
    logCardMinted.cardTypeId = event.args.cardTypeId.toBigInt();
    logCardMinted.editionNumber = event.args.editionNumber.toBigInt();

	await logCardMinted.save();
    logger.info("Chai log info handleLogCardMintedEvent end!");
}

// LogPackOpened(address indexed buyer, uint8 rarity);

export async function handleLogPackOpenedEvent(event: MoonbeamEvent<LogPackOpenedEventArgs>): Promise<void> {
    logger.info("Chai log info handleLogPackOpenedEvent start!");
	const logPackOpened = new LogPackOpened(event.transactionHash);

    logPackOpened.buyer = event.args.buyer;
    logPackOpened.rarity = event.args.rarity.toBigInt();

	await logPackOpened.save();
    logger.info("Chai log info handleLogPackOpenedEvent end!");
}

// LogSponsorLinked(address sponsor, address affiliate);

export async function handleLogSponsorLinkedEvent(event: MoonbeamEvent<LogSponsorLinkedEventArgs>): Promise<void> {
    logger.info("Chai log info handleLogSponsorLinkedEvent start!");
	const logSponsorLinked = new LogSponsorLinked(event.transactionHash);

    logSponsorLinked.sponsor = event.args.sponsor;
    logSponsorLinked.affiliate = event.args.affiliate;

	await logSponsorLinked.save();
    logger.info("Chai log info handleLogSponsorLinkedEvent end!");
}

// LogSponsorReward(address sponsor, address affiliate, uint zoomReward);

export async function handleLogSponsorRewardEvent(event: MoonbeamEvent<LogSponsorRewardEventArgs>): Promise<void> {
    logger.info("Chai log info handleLogSponsorRewardEvent start!");
	const logSponsorReward = new LogSponsorReward(event.transactionHash);

    logSponsorReward.sponsor = event.args.sponsor;
    logSponsorReward.affiliate = event.args.affiliate;
    logSponsorReward.zoomReward = event.args.zoomReward.toBigInt();

	await logSponsorReward.save();
    logger.info("Chai log info handleLogSponsorRewardEvent end!");
}

// LogDailyReward(address player, uint newBoosterBalance);

export async function handleLogDailyRewardEvent(event: MoonbeamEvent<LogDailyRewardEventArgs>): Promise<void> {
    logger.info("Chai log info handleLogDailyRewardEvent start!");
    const logDailyReward = new LogDailyReward(event.transactionHash);

    logDailyReward.player = event.args.player;
    logDailyReward.newBoosterBalance = event.args.newBoosterBalance.toBigInt();

	await logDailyReward.save();
    logger.info("Chai log info handleLogDailyRewardEvent end!");
}

// LogRewardBoosters(address winner, uint boostersAwarded);

export async function handleLogRewardBoostersEvent(event: MoonbeamEvent<LogRewardBoostersEventArgs>): Promise<void> {
    logger.info("Chai log info handleLogRewardBoostersEvent start!");
    const logRewardBoosters = new LogRewardBoosters(event.transactionHash);

    logRewardBoosters.winner = event.args.winner;
    logRewardBoosters.boostersAwarded = event.args.boostersAwarded.toBigInt();

    await logRewardBoosters.save();
    logger.info("Chai log info handleLogRewardBoostersEvent end!");
}

// LogSacrificeNFT(address owner, uint256 tokenId, uint16 cardTypeId, uint256 zoomGained);

export async function handleLogSacrificeNFTEvent(event: MoonbeamEvent<LogSacrificeNFTEventArgs>): Promise<void> {
    logger.info("Chai log info handleLogSacrificeNFTEvent start!");
	const logSacrificeNFT = new LogSacrificeNFT(event.transactionHash);

    logSacrificeNFT.owner = event.args.owner;
    logSacrificeNFT.tokenId = event.args.tokenId.toBigInt();
    logSacrificeNFT.cardTypeId = event.args.cardTypeId.toBigInt();
    logSacrificeNFT.zoomGained = event.args.zoomGained.toBigInt();

	await logSacrificeNFT.save();
    logger.info("Chai log info handleLogSacrificeNFTEvent end!");
}
