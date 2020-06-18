import { Entity } from './Entity';
import { EntityStore } from './EntityStore';

export interface Product extends Entity {
    name: string;
}

export class ProductStore implements EntityStore<Product> {
    products: Array<Product> = [
        { id: 'imac', name: 'iMac' },
        { id: 'iphone', name: 'iPhone' },
        { id: 'macbook', name: 'MacBook' },
    ];

    size = () => this.products.length;

    getEntities = () => {
        return this.products;
    };

    getEntity = (entityId: string) =>
        this.products.find((product) => product.id === entityId);

    getEntitiesForIds = (entityIds: Array<string>) => {
        return entityIds.map((entityId) => {
            const entity = this.getEntity(entityId);
            return entity ? entity : { id: 'unknown', name: 'Unknown' };
        });
    };
}

describe('EntityStore', () => {
    describe('getEntitiesForIds()', () => {
        it('returns an array of entities for the provided ids', () => {
            const productStore = new ProductStore();

            const productIds = ['imac', 'iphone', 'junk'];

            const products = productStore.getEntitiesForIds(productIds);

            expect(products[0].name).toEqual('iMac');
            expect(products[1].name).toEqual('iPhone');
            expect(products[2].name).toEqual('Unknown');
        });
    });
});
