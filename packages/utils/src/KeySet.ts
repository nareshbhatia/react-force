import { ArrayUtils } from './ArrayUtils';

/**
 * A set of keys.
 * We use the TypeScript indexable type for this.
 * See https://www.typescriptlang.org/docs/handbook/interfaces.html
 *
 * Example:
 * {
 *     'Mon': true,
 *     'Wed': true,
 *     'Fri': true,
 *     'Sat': false,
 *     'Sun': false,
 * }
 */
export interface KeySet {
    [item: string]: boolean;
}

/**
 * A key-value pair, with the value being a boolean
 *
 * Example:
 * {
 *     key: 'Mon',
 *     value: true,
 * }
 */
export interface KeyBoolValue {
    key: string;
    value: boolean;
}

/**
 * Returns all keys of a KeySet as an array
 */
export const keySetToArray = (set: KeySet) => Object.keys(set);

/**
 * Returns KeySet as an array of key-value pairs
 */
export const keySetToKeyValue = (set: KeySet): Array<KeyBoolValue> => {
    const keys = Object.keys(set);
    return keys.map((key) => ({
        key,
        value: set[key],
    }));
};

/**
 * Comparison function for key-value pairs
 */
export function compareKeyBoolValues(e1: KeyBoolValue, e2: KeyBoolValue) {
    const result = e1.key.localeCompare(e2.key);
    if (result !== 0) {
        return result;
    }

    return e1.value === e2.value ? 0 : e1.value ? -1 : 1;
}

/**
 * Returns keys whose value is true
 */
export const keySetGetOnKeys = (set: KeySet) => {
    const keys = Object.keys(set);
    return keys.filter((key) => set[key]);
};

/**
 * Returns keys whose value is true
 */
export const keySetGetOffKeys = (set: KeySet) => {
    const keys = Object.keys(set);
    return keys.filter((key) => !set[key]);
};

export const arrayToKeySet = (keys: Array<string>) =>
    keys.reduce((keySet: KeySet, key) => {
        keySet[key] = true;
        return keySet;
    }, {});

export const mergeKeySets = (...sets: Array<KeySet | undefined>) =>
    Object.assign({}, ...sets);

/**
 * Returns true if the two keySets have the same keys (ignoring order)
 * Note that the values are not compared.
 */
export const keySetsMatchKeys = (k1: KeySet, k2: KeySet): boolean => {
    const a1 = keySetToArray(k1);
    const a2 = keySetToArray(k2);
    return ArrayUtils.isEqual(a1, a2, ArrayUtils.compareStrings);
};

/**
 * Returns true if the two keySets have the same keys and values (ignoring order)
 * Note that the values are not compared.
 */
export const keySetsAreEqual = (k1: KeySet, k2: KeySet): boolean => {
    const a1 = keySetToKeyValue(k1);
    const a2 = keySetToKeyValue(k2);
    return ArrayUtils.isEqual(a1, a2, compareKeyBoolValues);
};

/**
 * Returns true if the supplied KeySet contains any of the specified keys
 */
export const keySetContainsOneOf = (
    set: KeySet,
    keys: Array<string>
): boolean => {
    // Find a key that exists in the KeySet
    return keys.findIndex((key) => set[key]) > -1;
};

/**
 * Returns a new KeySet with values from src copied to target.
 * If a key does not exist in target, then it is not copied.
 * (This is different from Object.assign)
 * Neither src or target are mutated
 */
export const keySetCopyValues = (target: KeySet, src: KeySet): KeySet => {
    const srcKeys = keySetToArray(src);
    const targetCopy = { ...target };
    srcKeys.forEach((srcKey) => {
        if (target[srcKey] !== undefined) {
            targetCopy[srcKey] = src[srcKey];
        }
    });
    return targetCopy;
};
