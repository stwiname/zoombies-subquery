import {Transaction,Sum,ZoomInflation,ZoomPerDay,ZoomScoreUpdated,ZoomBurned,NFTPerDay,RarityPerDay,LogCardTypeLoaded,LogCardMinted,MintedType,LogPackOpened,LogSponsorLinked,LogSponsorReward,LogDailyReward,LogRewardBooster,LogSacrificeNFT,NftTransfer, NFTHolders,SponsorAffiliateCount,SponsorRewardTotal} from "../types";
import {
  FrontierEvmEvent,
  FrontierEvmCall,
} from "@subql/frontier-evm-processor";
import { BigNumber } from "ethers";

// Setup types from ABI
type TransferEventArgs = [string, string, BigNumber] & { from: string; to: string; value: BigNumber; };
type ZoomScoreUpdatedEventArgs = [string, BigNumber, BigNumber] & {owner: string; newZoomScore: bigint; amount: bigint; };
type ZoomBurnedEventArgs = [string, BigNumber] & {owner: string; totalZoomBurned: bigint; amount: bigint; };
type CardMintedEventArgs = [string, BigNumber, number, BigNumber] & {buyer: string; tokenId: bigint; rarity: number ; cardTypeId: number; editionNumber: bigint; isFoil: boolean;};
type LogCardTypeLoadedEventArgs = [number, string, BigNumber] & {cardTypeId: number; cardTypeName: string; editionTotal:bigint; };
type LogPackOpenedEventArgs = [string, number] & {buyer: string; rarity:number; };
type LogSponsorLinkedEventArgs = [string, string] & {sponsor:string, affiliate:string};
type LogSponsorRewardEventArgs = [string, string, BigNumber] & {sponsor:string, affiliate:string, zoomReward:bigint};
type LogDailyRewardEventArgs = [string, BigNumber] & {player:string, newBoosterBalance:bigint; };
type LogRewardBoostersEventArgs = [string, BigNumber] & {winner:string, boostersAwarded:bigint; };
type LogSacrificeNFTEventArgs = [string, BigNumber, BigNumber, BigNumber] & {owner:string, tokenId:bigint, cardTypeId:bigint, zoomGained:bigint; };
type NFTTransferEventArgs = [string, string, BigNumber] & { from: string; to: string; tokenId: bigint; };


function createSum(id: string): Sum {
  const entity = new Sum(id);
  entity.mintedTotal = BigInt(0);
  entity.burnedTotal = BigInt(0);
  return entity;
}

function createZoomInflation(timestamp: string): ZoomInflation {
  const entity = new ZoomInflation(timestamp);
  entity.total = BigInt(0);
  return entity;
}

function createTrackedPerDay(timestamp: string): ZoomPerDay {
  const entity = new ZoomPerDay(timestamp);
  entity.minted = BigInt(0);
  entity.burned = BigInt(0);
  return entity;
}

function createNFTPerDay(timestamp: string): NFTPerDay {
  const entity = new NFTPerDay(timestamp);
  entity.minted = BigInt(0);
  entity.burned = BigInt(0);
  return entity;
}

function createRarityPerDay(timestamp: string): RarityPerDay {
  const entity = new RarityPerDay(timestamp);
  entity.diamond = BigInt(0);
  entity.platinum = BigInt(0);
  entity.epic = BigInt(0);
  entity.rare = BigInt(0);
  entity.uncommon = BigInt(0);
  entity.common = BigInt(0);
  return entity;
}

function createMintedTypes(cardTypeId: string): MintedType {
  const entity = new MintedType(cardTypeId);
  return
}

function createNFTHolders(wallet: string): NFTHolders {
  const entity = new NFTHolders(wallet);
  return entity;
}

function createSponsorAffiliate(wallet: string): SponsorAffiliateCount {
  const entity = new SponsorAffiliateCount(wallet);
  entity.affiliateCount = BigInt(0);
  return entity;
}

function createSponsorReward(wallet: string): SponsorRewardTotal {
  const entity = new SponsorRewardTotal(wallet);
  entity.rewardTotal = BigInt(0);
  return entity;
}

export async function handleMoonbeamEvent(event: FrontierEvmEvent<TransferEventArgs>): Promise<void> {
  handleTransfer(event, 1284);
}
export async function handleMoonbaseEvent(event: FrontierEvmEvent<TransferEventArgs>): Promise<void> {
  handleTransfer(event, 1287);
}
async function handleTransfer(event: FrontierEvmEvent<TransferEventArgs>, network: number): Promise<void> {
    const transaction = new Transaction(event.transactionHash);
    transaction.blockTimestamp = event.blockTimestamp;
    transaction.network = network;
    transaction.value = event.args.value.toBigInt();
    transaction.from = event.args.from;
    transaction.to = event.args.to;
    transaction.contractAddress = event.address;
    await transaction.save();

    //Create entity to hold TOTAL minted/burned per day
    let entity = await Sum.get("1");
    if(entity === undefined){
      entity = createSum("1");
    }

    //Create entity to hold Summary minted/burned Per Day
    const date = Date.parse(new Date(transaction.blockTimestamp).toISOString().split('T')[0]).toString();
    // logger.info("MYYYYYYYYY DAAAAAATTTTTTEEEEEEE:");
    // logger.info(date);
    let zpd = await ZoomPerDay.get(date);
    if(zpd === undefined){
      zpd = createTrackedPerDay(date);
    }

    //Create entity to hold TOTAL Cumulative minted/burned
    let inflation = await ZoomInflation.get(date);
    if(inflation === undefined){ //then get yeserday's inflation value
      inflation = createZoomInflation(date);
      const prevDay = new Date();
      prevDay.setTime(parseInt(date) - 86400000);
      const yesterday_timestamp = Date.parse(new Date(prevDay.getTime()).toISOString().split('T')[0]).toString();
      // logger.info("YESTERDAY!!!!!!!!:");
      // logger.info(yesterday_timestamp);
      let old_inflation = await ZoomInflation.get(yesterday_timestamp);
      if(old_inflation !== undefined){
        if(transaction.from == "0x0000000000000000000000000000000000000000") {
          inflation.total = BigInt(old_inflation.total) + event.args.value.toBigInt();
        }
        if(transaction.to == "0x0000000000000000000000000000000000000000") {
          inflation.total = BigInt(old_inflation.total) - event.args.value.toBigInt();
        }
      }
    }else{
      if(transaction.from == "0x0000000000000000000000000000000000000000") {
        inflation.total = BigInt(inflation.total) + event.args.value.toBigInt();
      }
      if(transaction.to == "0x0000000000000000000000000000000000000000") {
        inflation.total = BigInt(inflation.total) - event.args.value.toBigInt();
      }
    }
    await inflation.save();

    //Track our totals
    if(transaction.from == "0x0000000000000000000000000000000000000000") {
      entity.mintedTotal = BigInt(entity.mintedTotal) + event.args.value.toBigInt();
      zpd.minted = BigInt(zpd.minted) + event.args.value.toBigInt();
    }
    if(transaction.to == "0x0000000000000000000000000000000000000000") {
      entity.burnedTotal = BigInt(entity.burnedTotal) + event.args.value.toBigInt();
      zpd.burned = BigInt(zpd.burned) + event.args.value.toBigInt();
    }

    await entity.save();
    await zpd.save();


}

export async function moonbeamHandleZoomScoreUpdatedEvent(event: FrontierEvmEvent<ZoomScoreUpdatedEventArgs>): Promise<void> {
  zoomScoreUpdatedEvent(event, 1284);
}
export async function moonbaseHandleZoomScoreUpdatedEvent(event: FrontierEvmEvent<ZoomScoreUpdatedEventArgs>): Promise<void> {
  zoomScoreUpdatedEvent(event, 1284);
}
async function zoomScoreUpdatedEvent(event: FrontierEvmEvent<ZoomScoreUpdatedEventArgs>, network: number): Promise<void> {
  const zoom = new ZoomScoreUpdated(event.transactionHash);
  zoom.blockTimestamp = event.blockTimestamp;
  zoom.network = network;
  zoom.owner = event.args.owner;
  zoom.newZoomScore = event.args.newZoomScore;
  zoom.zoomGained = event.args.amount;

  await zoom.save();
}

export async function moonbeamHandleZoomBurnedEvent(event: FrontierEvmEvent<ZoomBurnedEventArgs>): Promise<void> {
  handleZoomBurnedEvent(event, 1284);
}
export async function moonbaseHandleZoomBurnedEvent(event: FrontierEvmEvent<ZoomBurnedEventArgs>): Promise<void> {
  handleZoomBurnedEvent(event, 1287);
}
async function handleZoomBurnedEvent(event: FrontierEvmEvent<ZoomBurnedEventArgs>, network: number): Promise<void> {
  const zoom = new ZoomBurned(event.transactionHash);
  zoom.blockTimestamp = event.blockTimestamp;
  zoom.network = network;
  zoom.owner = event.args.owner;
  zoom.totalZoomBurned = event.args.totalZoomBurned;
  zoom.zoomBurned = event.args.amount;

  await zoom.save();
}

export async function moonbeamHandleLogCardTypeLoadedEvent(event: FrontierEvmEvent<LogCardTypeLoadedEventArgs>): Promise<void> {
  handleLogCardTypeLoadedEvent(event, 1284);
}
export async function moonbaseHandleLogCardTypeLoadedEvent(event: FrontierEvmEvent<LogCardTypeLoadedEventArgs>): Promise<void> {
  handleLogCardTypeLoadedEvent(event, 1287);
}
async function handleLogCardTypeLoadedEvent(event: FrontierEvmEvent<LogCardTypeLoadedEventArgs>, network: number): Promise<void> {
  const card = new LogCardTypeLoaded(event.transactionHash);
  card.blockTimestamp = event.blockTimestamp;
  card.network = network;
  card.cardTypeId = event.args.cardTypeId;
  card.cardTypeName = event.args.cardTypeName;
  card.editionTotal = event.args.editionTotal;
  await card.save();
}

export async function moonbeamHandleLogCardMintedEvent(event: FrontierEvmEvent<CardMintedEventArgs>): Promise<void> {
  handleLogCardMintedEvent(event, 1284);
}
export async function moonbaseHandleLogCardMintedEvent(event: FrontierEvmEvent<CardMintedEventArgs>): Promise<void> {
  handleLogCardMintedEvent(event, 1287);
}
async function handleLogCardMintedEvent(event: FrontierEvmEvent<CardMintedEventArgs>, network:number): Promise<void> {
  const card = new LogCardMinted(event.transactionHash);
  card.blockTimestamp = event.blockTimestamp;
  card.network = network;
  card.buyer = event.args.buyer;
  card.tokenId = event.args.tokenId;
  card.rarity = event.args.rarity;
  card.cardTypeId = event.args.cardTypeId;
  card.editionNumber = event.args.editionNumber;
  card.isFoil = event.args.isFoil;
  await card.save();

  let typeMinted = await MintedType.get((event.args.cardTypeId).toString());
  if(typeMinted === undefined){
    typeMinted = new MintedType((event.args.cardTypeId).toString());
    typeMinted.blockTimestamp = event.blockTimestamp;
    typeMinted.cardTypeId = event.args.cardTypeId;
    await typeMinted.save();
  }

  //Create entity to hold count NFT minted Per Day
  const date = Date.parse(new Date(event.blockTimestamp).toISOString().split('T')[0]).toString();

  let npd = await NFTPerDay.get(date);
  if(npd === undefined){
    npd = createNFTPerDay(date);
  }
  npd.minted = BigInt(npd.minted) + BigInt(1);
  await npd.save();
}

export async function moonbeamHandleLogPackOpenedEvent(event: FrontierEvmEvent<LogPackOpenedEventArgs>): Promise<void> {
  handleLogPackOpenedEvent(event, 1284);
}
export async function moonbaseHandleLogPackOpenedEvent(event: FrontierEvmEvent<LogPackOpenedEventArgs>): Promise<void> {
  handleLogPackOpenedEvent(event, 1287);
}
async function handleLogPackOpenedEvent(event: FrontierEvmEvent<LogPackOpenedEventArgs>, network:number): Promise<void> {
  const pack = new LogPackOpened(event.transactionHash);
  pack.blockTimestamp = event.blockTimestamp;
  pack.network = network;
  pack.buyer = event.args.buyer;
  pack.rarity = event.args.rarity;
  await pack.save();

  const date = Date.parse(new Date(event.blockTimestamp).toISOString().split('T')[0]).toString();

  let rpd = await RarityPerDay.get(date);
  if(rpd === undefined){
    rpd = createRarityPerDay(date);
  }

  switch (event.args.rarity) {
    case 1:
          rpd.diamond = BigInt(rpd.diamond) + BigInt(1);
      break;
    case 2:
          rpd.platinum = BigInt(rpd.platinum) + BigInt(1);
      break;
    case 3:
          rpd.epic = BigInt(rpd.epic) + BigInt(1);
      break;
    case 4:
          rpd.rare = BigInt(rpd.rare) + BigInt(1);
      break;
    case 5:
          rpd.uncommon = BigInt(rpd.uncommon) + BigInt(1);
      break;
    case 6:
          rpd.common = BigInt(rpd.common) + BigInt(1);
      break;
    default:
          logger.info("Error in storing LogPackOpenedEvent");
          logger.info(event);
      break;
  }

  await rpd.save();
}

export async function moonbeamHandleLogSponsorLinkedEvent(event: FrontierEvmEvent<LogSponsorLinkedEventArgs>): Promise<void> {
  handleLogSponsorLinkedEvent(event, 1284);
}
export async function moonbaseHandleLogSponsorLinkedEvent(event: FrontierEvmEvent<LogSponsorLinkedEventArgs>): Promise<void> {
  handleLogSponsorLinkedEvent(event, 1287);
}
async function handleLogSponsorLinkedEvent(event: FrontierEvmEvent<LogSponsorLinkedEventArgs>, network:number): Promise<void> {
  const sponsor = new LogSponsorLinked(event.transactionHash);
  sponsor.blockTimestamp = event.blockTimestamp;
  sponsor.network = network;
  sponsor.sponsor = event.args.sponsor;
  sponsor.affiliate = event.args.affiliate;
  
  await sponsor.save();

  let isSponsor = await SponsorAffiliateCount.get(sponsor.sponsor);
  if(isSponsor === undefined){
    isSponsor = createSponsorAffiliate(sponsor.sponsor);
  }

  isSponsor.affiliateCount += BigInt(1);
  await isSponsor.save();
}

export async function moonbeamHandleLogSponsorRewardEvent(event: FrontierEvmEvent<LogSponsorRewardEventArgs>): Promise<void> {
  handleLogSponsorRewardEvent(event, 1284);
}
export async function moonbaseHandleLogSponsorRewardEvent(event: FrontierEvmEvent<LogSponsorRewardEventArgs>): Promise<void> {
  handleLogSponsorRewardEvent(event, 1287);
}
async function handleLogSponsorRewardEvent(event: FrontierEvmEvent<LogSponsorRewardEventArgs>, network:number): Promise<void> {
  const reward = new LogSponsorReward(event.transactionHash);
  reward.blockTimestamp = event.blockTimestamp;
  reward.network = network;
  reward.sponsor = event.args.sponsor;
  reward.affiliate = event.args.affiliate;
  reward.zoomReward = event.args.zoomReward;

  await reward.save();

  let isSponsor = await SponsorRewardTotal.get(reward.sponsor);
  if(isSponsor === undefined){
    isSponsor = createSponsorReward(reward.sponsor);
  }
  
  isSponsor.rewardTotal += BigInt(reward.zoomReward);
  await isSponsor.save();
}

export async function moonbeamHandleLogDailyRewardEvent(event: FrontierEvmEvent<LogDailyRewardEventArgs>): Promise<void> {
  handleLogDailyRewardEvent(event, 1284);
}
export async function moonbaseHandleLogDailyRewardEvent(event: FrontierEvmEvent<LogDailyRewardEventArgs>): Promise<void> {
  handleLogDailyRewardEvent(event, 1287);
}
async function handleLogDailyRewardEvent(event: FrontierEvmEvent<LogDailyRewardEventArgs>, network:number): Promise<void> {
  const reward = new LogDailyReward(event.transactionHash);
  reward.network = network;
  reward.blockTimestamp = event.blockTimestamp;
  reward.player = event.args.player;
  reward.newBoosterBalance = event.args.newBoosterBalance;

  await reward.save();
}

export async function moonbeamHandleLogRewardBoostersEvent(event: FrontierEvmEvent<LogRewardBoostersEventArgs>): Promise<void> {
  handleLogRewardBoostersEvent(event, 1284);
}
export async function moonbaseHandleLogRewardBoostersEvent(event: FrontierEvmEvent<LogRewardBoostersEventArgs>): Promise<void> {
  handleLogRewardBoostersEvent(event, 1287);
}
async function handleLogRewardBoostersEvent(event: FrontierEvmEvent<LogRewardBoostersEventArgs>, network:number): Promise<void> {
  const reward = new LogRewardBooster(event.transactionHash);
  reward.blockTimestamp = event.blockTimestamp;
  reward.network = network;
  reward.winner = event.args.winner;
  reward.boostersAwarded = event.args.boostersAwarded;

  await reward.save();
}

export async function moonbeamHandleLogSacrificeNFTEvent(event: FrontierEvmEvent<LogSacrificeNFTEventArgs>): Promise<void> {
  handleLogSacrificeNFTEvent(event, 1284);
}
export async function moonbaseHandleLogSacrificeNFTEvent(event: FrontierEvmEvent<LogSacrificeNFTEventArgs>): Promise<void> {
  handleLogSacrificeNFTEvent(event, 1287);
}
async function handleLogSacrificeNFTEvent(event: FrontierEvmEvent<LogSacrificeNFTEventArgs>, network:number): Promise<void> {
  const sac = new LogSacrificeNFT(event.transactionHash);
  sac.blockTimestamp = event.blockTimestamp;
  sac.network = network;
  sac.owner = event.args.owner;
  sac.tokenId = event.args.tokenId;
  sac.cardTypeId = event.args.cardTypeId;
  sac.zoomGained = event.args.zoomGained;

  await sac.save();
}

export async function moonbeamHandleNFTTransferEvent(event: FrontierEvmEvent<NFTTransferEventArgs>): Promise<void> {
  handleNFTTransferEvent(event, 1284);
}
export async function moonbaseHandleNFTTransferEvent(event: FrontierEvmEvent<NFTTransferEventArgs>): Promise<void> {
  handleNFTTransferEvent(event, 1287);
}

async function handleNFTTransferEvent(event: FrontierEvmEvent<NFTTransferEventArgs>, network:number): Promise<void> {
  const nftTransfer = new NftTransfer(event.transactionHash);
  nftTransfer.blockTimestamp = event.blockTimestamp;
  nftTransfer.network = network;
  nftTransfer.from = event.args.from;
  nftTransfer.to = event.args.to;
  nftTransfer.tokenId = event.args.tokenId;

  await nftTransfer.save();

  let isHolder = await NFTHolders.get(nftTransfer.to);
  if(isHolder === undefined){
    isHolder = createNFTHolders(nftTransfer.to);
  }

  await isHolder.save();
}
