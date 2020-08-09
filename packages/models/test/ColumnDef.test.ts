import { ColumnDef, Entity, getSortSpec } from '../src';

export interface Product extends Entity {
    name: string;
    manufacturer: string;
    department: string;
    price: number;
    isFeatured: boolean;
}

const columnDefs: Array<ColumnDef<Product>> = [
    { field: 'name', headerName: 'Product', sortOrder: 'asc' },
    { field: 'manufacturer', headerName: 'Company' },
    { field: 'department', headerName: 'Department' },
    { field: 'price', headerName: 'Price' },
];

const columnDefsNoSort: Array<ColumnDef<Product>> = [
    { field: 'name', headerName: 'Product' },
    { field: 'manufacturer', headerName: 'Company' },
    { field: 'department', headerName: 'Department' },
    { field: 'price', headerName: 'Price' },
];

describe('getSortSpec(columnDefs: Array<ColumnDef>)', () => {
    it('returns the sortSpec on the first column that defines it', () => {
        expect(getSortSpec(columnDefs)).toEqual({
            field: 'name',
            order: 'asc',
        });
    });

    it('returns undefined if no column defines a sortSpec', () => {
        expect(getSortSpec(columnDefsNoSort)).toBeUndefined();
    });
});
