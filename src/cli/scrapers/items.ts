import * as XRay from 'x-ray';
import * as fs from 'fs';

import * as _ from 'lodash';
import { Limit } from '../../shared/constants/limit';
import { Slot } from '../../shared/constants/slot';
import { Item } from '../../shared/entities/item';

const x: XRay.Instance = XRay();

type ItemLike = { [key in keyof Item]?: string };

interface AltItemLike {
  priceAlt: string;
  textAlt: string;
  textAltAlt: string;
  limitAlt: string;
  slotAlt: string;
}

// the basis of this scraper is to use the data from the Gloomhaven Subreddit wiki
const URL_BASE = 'https://old.reddit.com/r/Gloomhaven/wiki/items/item_';

(async () => {
  const matchers: ItemLike & AltItemLike = {
    name: 'h1',
    count: '#wiki_count + p',
    price: '#wiki_gold_price + p',
    text: '[id*="wiki_when_usable"] + p',
    limit: '#wiki_after_use_effect + p',
    negativeCardsCount: '#wiki_number_of_-1_cards_added + p',
    slot: '#wiki_equip_slot + p',
    sourceType: '#wiki_source + p',
    priceAlt: '#wiki_cost + p',
    textAlt: '#wiki_effect + p',
    limitAlt: '#wiki_after_use + p',
    slotAlt: '#wiki_type + p',
    textAltAlt: '#wiki_bonus_gained + p',
  };

  let items: Item[] = await Promise.all(
    _.range(1, 151).map(async itemNo => {
      const result: ItemLike & AltItemLike = await x(
        `${URL_BASE}${_.padStart(itemNo + '', 3, '0')}`,
        '.wiki',
        matchers,
      );

      const item: Item = {
        number: itemNo,
        cardNo: null,
        name: _.last(result.name.split(' — ')) || null,
        slot: determineSlot(result) || null,
        price: +result.price || +result.priceAlt || null,
        text: result.text || result.textAlt || result.textAltAlt || null,
        count: +result.count || null,
        limit: determineLimit(result) || null,
        uses: determineUses(result) || null,
        negativeCardsCount:
          ((result.negativeCardsCount || '').toLowerCase() === 'none' ? 0 : +result.negativeCardsCount) || null,
        sourceType: <any>result.sourceType || null,
        sourceId: null,
        imageUrl: null,
        verified: false,
      };

      return item;
    }),
  );

  items = _.sortBy(items, item => item.relativeNumberPosition);

  await fs.promises.writeFile('./dump/items.json', JSON.stringify(items, null, 2), { encoding: 'utf-8' });
})().catch(err => console.error(err));

function determineLimit(item: ItemLike & AltItemLike): Limit {
  if (_.head((item.limit || item.limitAlt || '').split(' ')).toLowerCase() === 'spent') {
    return Limit.Spent;
  }

  if ((item.limit || item.limitAlt || '').toLowerCase() === 'consumed') {
    return Limit.Consumed;
  }

  if ((item.limit || item.limitAlt || '').toLowerCase() === 'unlimited') {
    return Limit.Unlimited;
  }

  if ((item.limit || item.limitAlt || '').toLowerCase() === 'consumed, cannot be refreshed once consumed') {
    return Limit.UseOncePerScenario;
  }

  return null;
}

function determineUses(item: ItemLike & AltItemLike): number {
  const matches = (item.limit || item.limitAlt || '').match(/(\d+) use slots/);

  if (!matches) {
    return null;
  }

  return +matches[1];
}

function determineSlot(item: ItemLike & AltItemLike): Slot {
  switch ((item.slot || item.slotAlt || '').toLowerCase()) {
    case 'head':
      return Slot.Head;
    case 'body':
      return Slot.Body;
    case 'legs':
      return Slot.Legs;
    case 'one hand':
      return Slot.OneHand;
    case 'two hands':
    case '2 hands':
      return Slot.TwoHands;
    case 'small item':
      return Slot.SmallItem;
  }

  return null;
}
