import { getEntityKeySet } from './Entity';
import { Product } from '../test/mock-data';

describe('Entity', () => {
    it('getEntityKeySet(Array<Entity>)', () => {
        const products = [
            new Product('imac', 'iMac'),
            new Product('macbook', 'MacBook'),
        ];

        const actual = getEntityKeySet(products);

        const expected = {
            imac: true,
            macbook: true,
        };

        expect(actual).toEqual(expected);
    });

    it('getEntityKeySet(null)', () => {
        const actual = getEntityKeySet(null);

        const expected = {};

        expect(actual).toEqual(expected);
    });
});
