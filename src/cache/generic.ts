import type { MaybeObjectValue } from '@rtm/shared-types/CustomUtilityTypes';
import type { MsTimestamp, MsValue } from '@rtm/shared-types/Numbers';

// * ... Inspired from https://github.com/Julien-R44/bentocache

namespace GenericInMemoryCache {
  export const data: DataCache = {};
}

export const keysFactory = {
  discordProfilePicture: (id: string) => `discord:pp:${id}`
};

function invalidateExpiredCacheData(key: string) {
  if (GenericInMemoryCache.data[key] === undefined) return;

  const clock = GenericInMemoryCache.data[key].clock;
  if (!clock) return;

  const { cachedAt, ttl } = clock;
  // Stryker Workaround 1. Pointless mutant
  // Stryker disable next-line EqualityOperator
  if (Math.abs(Date.now() - cachedAt) >= ttl) delete GenericInMemoryCache.data[key];
}

export function get(key: string) {
  invalidateExpiredCacheData(key);
  return GenericInMemoryCache.data[key]?.value;
}

export function getClock(key: string) {
  invalidateExpiredCacheData(key);
  // Stryker Workaround 2. Pointless mutant
  // Stryker disable next-line OptionalChaining
  return GenericInMemoryCache.data[key]?.clock;
}

// eslint-disable-next-line no-magic-numbers
export function set(key: string, data: Data, ttl: MsValue = 0) {
  function setClock(key: string, ttl: MsValue) {
    GenericInMemoryCache.data[key].clock = {
      cachedAt: Date.now(),
      ttl
    };
  }

  function disposeClock(key: string) {
    // @ts-expect-error - IDGAF lemme manipulate the RAM
    GenericInMemoryCache.data[key].clock = undefined;
  }

  // Stryker Workaround 3. Pointless mutant `if (true)`
  // Stryker disable next-line ConditionalExpression
  if (!GenericInMemoryCache.data[key]) GenericInMemoryCache.data[key] = {} as DataCacheEntry;
  // Stryker Workaround 4. Pointless mutants
  // Stryker disable next-line ConditionalExpression,EqualityOperator
  GenericInMemoryCache.data[key].value = typeof data === 'object' ? structuredClone(data) : data;

  /* eslint-disable no-magic-numbers */
  // Stryker Workaround 5. Pointless mutants
  // Stryker disable ConditionalExpression,EqualityOperator
  if (ttl > 0) setClock(key, ttl);
  else if (ttl < 0) disposeClock(key);
  // Stryker restore ConditionalExpression,EqualityOperator
  /* eslint-enable no-magic-numbers */
}

// eslint-disable-next-line no-magic-numbers
export async function getOrSet(key: string, data: () => Promise<Data>, ttl: MsValue = 0) {
  const value: MaybeObjectValue<Data> = get(key);
  if (value !== undefined) return value;

  const mountedData = await data();
  set(key, mountedData, ttl);
  return get(key);
}

export function clearAll() {
  for (const key of Object.keys(GenericInMemoryCache.data)) delete GenericInMemoryCache.data[key];
}

type Data = boolean | string | number | object | null;

type Clock = { cachedAt: MsTimestamp; ttl: MsValue };

type DataCacheEntry = {
  clock: Clock;
  value: Data;
};

type DataCache = Record<PropertyKey, DataCacheEntry>;
