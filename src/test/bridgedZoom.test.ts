import { subqlTest } from '@subql/testing';
import { ZoomBridged } from '../types';


subqlTest(
  'bridgedZoomEvent',
  5090527,
  [],
  [
    ZoomBridged.create({
      id: '0x2f5f14908bd0fe740d6053638289d120e1fdcc7439c5f1a9e84a8d70559a67e5',
      blockTimestamp: new Date(1694451150640),
      network: 1287,
      playerUUID: '9546e2ad-86ad-4185-8872-65f257dce65a',
      amount: BigInt('100000000000000000000')
    })],
  'moonbaseHandleBridgedZoomEvent'
);
