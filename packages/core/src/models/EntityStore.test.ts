import { ProductStore } from '../test/mock-data';

describe('EntityStore', () => {
    it('getEntitiesForIds()', () => {
        const productStore = new ProductStore();

        const productIds = ['E01', 'M01', 'Unknown'];

        const products = productStore.getEntitiesForIds(productIds);

        expect(products[0].name).toEqual('MacBook Pro');
        expect(products[1].name).toEqual('Purple Rain');
        expect(products[2].name).toEqual('Unknown');
    });
});
