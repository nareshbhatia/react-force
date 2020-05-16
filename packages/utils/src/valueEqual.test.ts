import { valueEqual } from '../src';

describe('undefined and null', () => {
    describe('when both are undefined', () => {
        it('returns true', () => {
            expect(valueEqual(undefined, undefined)).toBe(true);
        });
    });

    describe('when one is null', () => {
        it('returns false', () => {
            expect(valueEqual(undefined, null)).toBe(false);
        });
    });

    describe('when one is null and the other is an object', () => {
        it('returns false', () => {
            expect(valueEqual({}, null)).toBe(false);
            expect(valueEqual(null, {})).toBe(false);
        });
    });
});

describe('primitives of different types', () => {
    it('returns false', () => {
        expect(valueEqual(10, 'asdf')).toBe(false);
    });
});

describe('objects', () => {
    describe('that have the same structure and values', () => {
        it('returns true', () => {
            const obj1 = {
                p1: 1,
                p2: 'tesla',
                p3: {
                    model: 'S',
                    year: 2020,
                },
            };
            const obj2 = {
                p1: 1,
                p2: 'tesla',
                p3: {
                    model: 'S',
                    year: 2020,
                },
            };
            expect(valueEqual(obj1, obj2)).toBe(true);
        });
    });

    describe('that have the same structure but different values', () => {
        it('returns false', () => {
            const obj1 = {
                p1: 1,
                p2: 'tesla',
                p3: {
                    model: 'S',
                    year: 2020,
                },
            };
            const obj2 = {
                p1: 1,
                p2: 'tesla',
                p3: {
                    model: '3',
                    year: 2020,
                },
            };
            expect(valueEqual(obj1, obj2)).toBe(false);
        });
    });

    describe('that differ in structure', () => {
        it('returns false', () => {
            const obj1 = {
                p1: 1,
                p2: 'tesla',
                p3: {
                    model: 'S',
                    year: 2020,
                },
            };
            const obj2 = {
                p1: 1,
                p2: 'tesla',
            };
            expect(valueEqual(obj1, obj2)).toBe(false);
        });
    });
});

describe('string primitives', () => {
    describe('that are equal', () => {
        it('returns true', () => {
            expect(valueEqual('asdf', 'asdf')).toBe(true);
        });
    });

    describe('that are not equal', () => {
        it('returns false', () => {
            expect(valueEqual('asdf', 'sdfg')).toBe(false);
        });
    });
});

describe('number primitives', () => {
    describe('that are equal', () => {
        it('returns true', () => {
            expect(valueEqual(123.456, 123.456)).toBe(true);
        });
    });

    describe('that are not equal', () => {
        it('returns false', () => {
            expect(valueEqual(123.456, 123.567)).toBe(false);
        });
    });
});

describe('boolean primitives', () => {
    describe('that are equal', () => {
        it('returns true', () => {
            expect(valueEqual(true, true)).toBe(true);
        });
    });

    describe('that are not equal', () => {
        it('returns false', () => {
            expect(valueEqual(true, false)).toBe(false);
        });
    });
});

describe('date objects', () => {
    const now = Date.now();

    describe('that are equal', () => {
        it('returns true', () => {
            expect(valueEqual(new Date(now), new Date(now))).toBe(true);
        });
    });

    describe('that are not equal', () => {
        it('returns false', () => {
            expect(valueEqual(new Date(now), new Date(now + 1))).toBe(false);
        });
    });
});

describe('arrays', () => {
    describe('that are equal', () => {
        it('returns true', () => {
            expect(valueEqual([1, 2, 3], [1, 2, 3])).toBe(true);
        });
    });

    describe('that are not equal', () => {
        it('returns false', () => {
            expect(valueEqual([1, 2, 3], [2, 3, 4])).toBe(false);
        });
    });
});

describe('objects with different constructors but the same properties', () => {
    function A(this: any, a: any, b: any, c: any) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    function B(this: any, a: any, b: any, c: any) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    it('returns true', () => {
        // @ts-ignore
        expect(valueEqual(new A(1, 2, 3), new B(1, 2, 3))).toBe(true);
    });
});
