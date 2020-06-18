import { Entity, getEntityKeySet } from './Entity';

interface Product extends Entity {
    name: string;
}

describe('getEntityKeySet(entities: ArrayOrNone<Entity>)', () => {
    it('returns a KeySet of entity ids', () => {
        const products: Array<Product> = [
            { id: 'imac', name: 'iMac' },
            { id: 'macbook', name: 'MacBook' },
        ];

        const expected = {
            imac: true,
            macbook: true,
        };

        expect(getEntityKeySet(products)).toEqual(expected);
    });

    it('returns an empty KeySet if passed null or undefined', () => {
        expect(getEntityKeySet(null)).toEqual({});
        expect(getEntityKeySet(undefined)).toEqual({});
    });
});
