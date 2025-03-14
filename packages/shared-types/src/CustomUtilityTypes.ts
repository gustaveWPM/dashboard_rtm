/* v8 ignore start */
// Stryker disable all

type SplitKeys<S extends string> = S extends `${infer Head}${KeySeparator}${infer Tail}` ? [Head, ...SplitKeys<Tail>] : [S];

type JoinKeys<T extends string[]> = T extends []
  ? never
  : T extends [infer Head, ...infer Tail]
    ? Head extends string
      ? Tail extends string[]
        ? `${Head}${KeySeparator}${JoinKeys<Tail>}`
        : never
      : never
    : never;

export type MakeHomogeneousValuesObjType<T, ObjValuesType> = {
  [K in keyof T]: T[K] extends (infer U)[]
    ? MakeHomogeneousValuesObjType<U, ObjValuesType>[]
    : T[K] extends object
      ? MakeHomogeneousValuesObjType<T[K], ObjValuesType>
      : ObjValuesType;
};

export type JSPassedByValuePrimitives = undefined | boolean | string | number | null;
// * ... https://dev.to/ankittanna/how-to-create-a-type-for-complex-json-object-in-typescript-d81
export type JSONValue = { [k: string]: JSONValue } | Array<JSONValue> | boolean | string | number;

export type KeySeparator = '.';

export type DeepPathToLiteralKeys<DeepPath extends string> = JoinKeys<SplitKeys<DeepPath>>;

// https://github.com/microsoft/TypeScript/issues/56080
// eslint-disable-next-line perfectionist/sort-intersection-types
export type Couple<Left, Right = never> = /*__CAST `never` TO__*/ [] & Right extends never ? [Left, Left] : [Left, Right];

export type MaybeNull<T> = null | T;
export type MaybeUndefined<T> = undefined | T;
export type MaybeObjectValue<T> = MaybeUndefined<T>;
export type MaybeSessionUser<T> = MaybeUndefined<T>;
export type MaybeSessionUserField<T> = MaybeUndefined<T> | MaybeNull<T>;

// https://github.com/microsoft/TypeScript/issues/56080
export type CompareFun<T extends Couple<unknown>, CTX extends unknown[] = never> = /*__CAST `never` TO__*/ Function & CTX extends never
  ? // eslint-disable-next-line no-magic-numbers
    (left: T[0], right: T[1]) => CompareFunReturnValue
  : // eslint-disable-next-line no-magic-numbers
    (left: T[0], right: T[1], ...ctx: [...CTX]) => CompareFunReturnValue;

type CompareFunReturnValue = number;

export type EmptyString = '';

export type WithOptionalProps<T, OptionalKeys extends keyof T> = Partial<Pick<T, OptionalKeys>> & Omit<T, OptionalKeys>;

export type Rewire<BaseType, KeysToRewire extends keyof BaseType, NewType> = {
  [K in KeysToRewire]: NewType;
};

// Stryker restore all
/* v8 ignore stop */
