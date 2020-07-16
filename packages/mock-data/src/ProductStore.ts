import { ColumnDef, EntityStore, SortSpec } from '@react-force/models';
import numeral from 'numeral';
import { newProduct, Product } from './Product';
import { productData } from './productData';

/* istanbul ignore next */
export class ProductStore implements EntityStore<Product> {
    products: Array<Product> = productData;

    size = () => this.products.length;

    getEntities = (sortSpec?: SortSpec) => {
        // Create a copy of products array
        const result = this.products.slice();

        if (sortSpec) {
            switch (sortSpec.field) {
                case 'name':
                    result.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'department':
                    result.sort((a, b) =>
                        a.department.localeCompare(b.department)
                    );
                    break;
                case 'manufacturer':
                    result.sort((a, b) =>
                        a.manufacturer.localeCompare(b.manufacturer)
                    );
                    break;
                case 'price':
                    result.sort((a, b) => a.price - b.price);
                    break;
                default:
                    break;
            }
            if (sortSpec.order === 'desc') {
                result.reverse();
            }
        }
        return result;
    };

    getEntity = (entityId: string) =>
        this.products.find((product) => product.id === entityId);

    getEntitiesForIds = (entityIds: Array<string>) => {
        return entityIds.map((entityId) => {
            const entity = this.getEntity(entityId);
            return entity ? entity : newProduct();
        });
    };
}

/* istanbul ignore next */
export const productUnsortedColumnDefs: Array<ColumnDef<Product>> = [
    {
        field: 'name',
        headerName: 'Product',
    },
];

/* istanbul ignore next */
export const productColumnDefs: Array<ColumnDef<Product>> = [
    {
        field: 'name',
        headerName: 'Product',
        sortOrder: 'asc',
        width: 250,
    },
    {
        field: 'manufacturer',
        headerName: 'Company',
        width: 150,
    },
    {
        field: 'department',
        headerName: 'Department',
        width: 110,
    },
    {
        field: 'price',
        headerName: 'Price',
        align: 'right',
        cellRenderer: (product: Product) =>
            numeral(product.price).format('0,0.00'),
    },
];
