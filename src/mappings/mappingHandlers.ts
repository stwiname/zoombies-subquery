import {Approval, Transaction, LogCardTypeLoaded, LogCardMinted, LogPackOpened, LogSponsorLinked, LogSponsorReward, LogDailyReward, LogRewardBoosters, LogSacrificeNFT} from "../types";
import { MoonbeamEvent, MoonbeamCall } from '@subql/contract-processors/dist/moonbeam';
import { BigNumber } from "ethers";

// Setup types from ABI
type TransferEventArgs = [string, string, BigNumber] & { from: string; to: string; value: BigNumber; };
type ApproveCallArgs = [string, BigNumber] & { _spender: string; _value: BigNumber; }

export async function handleMoonriverEvent(event: MoonbeamEvent<TransferEventArgs>): Promise<void> {
    const transaction = new Transaction(event.transactionHash);

    transaction.value = event.args.value.toBigInt();
    transaction.from = event.args.from;
    transaction.to = event.args.to;
    transaction.contractAddress = event.address;

    await transaction.save();
}

export async function handleMoonriverCall(event: MoonbeamCall<ApproveCallArgs>): Promise<void> {
    const approval = new Approval(event.hash);

    approval.owner = event.from;
    approval.value = event.args._value.toBigInt();
    approval.spender = event.args._spender;
    approval.contractAddress = event.to;

    await approval.save();
}
export async function handleLogCardTypeLoadedEvent(event) {
    const logCardTypeLoaded = new LogCardTypeLoaded(event.hash);
	await logCardTypeLoaded.save();
}
export async function handleLogCardMintedEvent(event) {
    const logCardMinted = new LogCardMinted(event.hash);
	await logCardMinted.save();
}
export async function handleLogPackOpenedEvent(event) {
	const logPackOpened = new LogPackOpened(event.hash);
	await logPackOpened.save();
}
export async function handleLogSponsorLinkedEvent(event) {
	const logSponsorLinked = new LogSponsorLinked(event.hash);
	await logSponsorLinked.save();
}
export async function handleLogSponsorRewardEvent(event) {
	const logSponsorReward = new LogSponsorReward(event.hash);
	await logSponsorReward.save();
}
export async function handleLogDailyRewardEvent(event) {
    const logDailyReward = new LogDailyReward(event.hash);
	await logDailyReward.save();
}
export async function handleLogRewardBoostersEvent(event) {
    const logRewardBoosters = new LogRewardBoosters(event.hash);
	await logRewardBoosters.save();
}
export async function handleLogSacrificeNFTEvent(event) {
	const logSacrificeNFT = new LogSacrificeNFT(event.hash);
	await logSacrificeNFT.save();
}
