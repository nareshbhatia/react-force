import { ArrayUtils } from '../src';

const { compareNumbers, compareStrings, isEqual } = ArrayUtils;

interface State {
    id: string;
    name: string;
}

function compareStates(e1: State, e2: State) {
    return e1.id.localeCompare(e2.id);
}

interface Day {
    id: string;
    isHoliday: boolean;
}

// This is a stricter comparison, both id and holiday fields must match
function compareDays(e1: Day, e2: Day) {
    const result = e1.id.localeCompare(e2.id);
    if (result !== 0) {
        return result;
    }

    return e1.isHoliday === e2.isHoliday ? 0 : e1.isHoliday ? -1 : 1;
}

describe('ArrayUtils.isEqual()', () => {
    it('returns true if arrays are equal (ignoring order)', () => {
        const a1 = [10, 20, 30];
        const a2 = [10, 30, 20];
        expect(isEqual(a1, a2, compareNumbers)).toBeTruthy();
    });

    it('returns true if arrays are equal (considering order)', () => {
        const a1 = [10, 20, 30];
        const a2 = [10, 20, 30];
        expect(isEqual(a1, a2, compareNumbers, false)).toBeTruthy();
    });

    it('returns false if arrays are of different length', () => {
        const a1 = [10, 20, 30];
        const a2 = [10, 20];
        expect(isEqual(a1, a2, compareNumbers)).toBeFalsy();
    });

    it('returns false if arrays are not equal (ignoring order)', () => {
        const a1 = [10, 20, 30];
        const a2 = [10, 30, 25];
        expect(isEqual(a1, a2, compareNumbers)).toBeFalsy();
    });

    it('returns false if arrays are not equal (considering order)', () => {
        const a1 = [10, 20, 30];
        const a2 = [10, 30, 20];
        expect(isEqual(a1, a2, compareNumbers, false)).toBeFalsy();
    });

    it('returns true if string arrays are equal (ignoring order)', () => {
        const a1 = ['orange', 'banana', 'apple'];
        const a2 = ['orange', 'apple', 'banana'];
        expect(isEqual(a1, a2, compareStrings)).toBeTruthy();
    });

    it('returns true if object arrays are equal (ignoring order)', () => {
        const a1 = [
            { id: 'AK', name: 'Alaska' },
            { id: 'CA', name: 'California' },
            { id: 'MA', name: 'Massachusetts' },
        ];
        const a2 = [
            { id: 'CA', name: 'California' },
            { id: 'MA', name: 'Massachusetts' },
            { id: 'AK', name: 'Alaska' },
        ];
        expect(isEqual(a1, a2, compareStates)).toBeTruthy();
    });

    it('returns true if object arrays are strictly equal (ignoring order)', () => {
        const a1 = [
            { id: 'Mon', isHoliday: false },
            { id: 'Tue', isHoliday: false },
            { id: 'Wed', isHoliday: false },
            { id: 'Thu', isHoliday: false },
            { id: 'Fri', isHoliday: false },
            { id: 'Sat', isHoliday: true },
            { id: 'Sun', isHoliday: true },
        ];
        const a2 = [
            { id: 'Sat', isHoliday: true },
            { id: 'Sun', isHoliday: true },
            { id: 'Mon', isHoliday: false },
            { id: 'Tue', isHoliday: false },
            { id: 'Wed', isHoliday: false },
            { id: 'Thu', isHoliday: false },
            { id: 'Fri', isHoliday: false },
        ];
        expect(isEqual(a1, a2, compareDays)).toBeTruthy();
    });

    it('returns false if object arrays are not strictly equal (ignoring order)', () => {
        const a1 = [
            { id: 'Mon', isHoliday: false },
            { id: 'Tue', isHoliday: false },
            { id: 'Wed', isHoliday: false },
            { id: 'Thu', isHoliday: false },
            { id: 'Fri', isHoliday: false },
            { id: 'Sat', isHoliday: true },
            { id: 'Sun', isHoliday: true },
        ];
        const a2 = [
            { id: 'Mon', isHoliday: false },
            { id: 'Tue', isHoliday: false },
            { id: 'Wed', isHoliday: false },
            { id: 'Thu', isHoliday: true },
            { id: 'Fri', isHoliday: true },
            { id: 'Sat', isHoliday: false },
            { id: 'Sun', isHoliday: false },
        ];
        expect(isEqual(a1, a2, compareDays)).toBeFalsy();
    });
});
