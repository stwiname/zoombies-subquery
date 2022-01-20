import {LogSponsorLinkedEntity} from "../types";
import { MoonbeamEvent } from '@subql/contract-processors/dist/moonbeam';
import { BigNumber } from "ethers";

type LogSponsorLinkedEventArgs = [string, string] & { sponsor: string; affiliate: string; };

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
