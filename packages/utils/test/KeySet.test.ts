import {
    arrayToKeySet,
    keySetContainsOneOf,
    keySetCopyValues,
    keySetGetOnKeys,
    keySetGetOffKeys,
    keySetToArray,
    keySetToKeyValue,
    keySetsAreEqual,
    keySetsMatchKeys,
    mergeKeySets,
} from '../src';

describe('KeySet', () => {
    it('keySetToArray()', () => {
        const keySet = {
            Mon: true,
            Wed: true,
            Fri: true,
        };

        const actual = keySetToArray(keySet);

        const expected = ['Mon', 'Wed', 'Fri'];

        expect(actual).toEqual(expected);
    });

    it('keySetToKeyValue()', () => {
        const keySet = {
            Mon: true,
            Wed: false,
            Fri: true,
        };

        const actual = keySetToKeyValue(keySet);

        const expected = [
            { key: 'Mon', value: true },
            { key: 'Wed', value: false },
            { key: 'Fri', value: true },
        ];

        expect(actual).toEqual(expected);
    });

    it('keySetGetOnKeys()', () => {
        const keySet = {
            Mon: true,
            Wed: false,
            Fri: true,
        };

        expect(keySetGetOnKeys(keySet)).toEqual(['Mon', 'Fri']);
    });

    it('keySetGetOffKeys()', () => {
        const keySet = {
            Mon: true,
            Wed: false,
            Fri: true,
        };

        expect(keySetGetOffKeys(keySet)).toEqual(['Wed']);
    });

    it('arrayToKeySet()', () => {
        const keys = ['Mon', 'Wed', 'Fri'];

        const actual = arrayToKeySet(keys);

        const expected = {
            Mon: true,
            Wed: true,
            Fri: true,
        };

        expect(actual).toEqual(expected);
    });

    it('mergeKeySets()', () => {
        const keySet1 = {
            Mon: true,
            Wed: true,
            Fri: true,
        };
        const keySet2 = {
            Tue: true,
            Thu: true,
        };

        const actual = mergeKeySets(keySet1, keySet2);

        const expected = {
            Mon: true,
            Tue: true,
            Wed: true,
            Thu: true,
            Fri: true,
        };

        expect(actual).toEqual(expected);
    });

    it('keySetsMatchKeys()', () => {
        const k1 = {
            Mon: true,
            Wed: true,
            Fri: true,
        };

        const k2 = {
            Fri: true,
            Wed: true,
            Mon: false,
        };

        const k3 = {
            Mon: true,
            Wed: true,
            Thu: true,
        };

        expect(keySetsMatchKeys(k1, k2)).toBeTruthy();
        expect(keySetsMatchKeys(k1, k3)).toBeFalsy();
    });

    it('keySetsAreEqual()', () => {
        const k1 = {
            Mon: false,
            Tue: false,
            Wed: false,
            Thu: false,
            Fri: false,
            Sat: true,
            Sun: true,
        };

        const k2 = {
            Sat: true,
            Sun: true,
            Mon: false,
            Tue: false,
            Wed: false,
            Thu: false,
            Fri: false,
        };

        const k3 = {
            Mon: false,
            Tue: false,
            Wed: false,
            Thu: true,
            Fri: true,
            Sat: false,
            Sun: false,
        };

        expect(keySetsAreEqual(k1, k2)).toBeTruthy();
        expect(keySetsAreEqual(k1, k3)).toBeFalsy();
    });

    it('keySetContainsOneOf()', () => {
        const keySet = {
            Mon: true,
            Wed: true,
            Fri: true,
        };

        expect(keySetContainsOneOf(keySet, ['Sat', 'Sun'])).toBe(false);
        expect(keySetContainsOneOf(keySet, ['Sat', 'Wed'])).toBe(true);
        expect(keySetContainsOneOf(keySet, ['Wed'])).toBe(true);
        expect(keySetContainsOneOf(keySet, ['Wed', 'Fri'])).toBe(true);
    });

    it('keySetCopyValues()', () => {
        const target = {
            Mon: true,
            Tue: true,
            Wed: false,
            Thu: false,
            Fri: true,
        };

        const src = {
            Mon: true,
            Tue: false,
            Wed: true,
            Thu: false,
            Sat: true,
        };

        const expected = {
            Mon: true,
            Tue: false,
            Wed: true,
            Thu: false,
            Fri: true,
        };

        expect(keySetCopyValues(target, src)).toEqual(expected);
    });
});
