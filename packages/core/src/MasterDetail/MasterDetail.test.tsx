import React, { Fragment } from 'react';
import { fireEvent, getByText, render } from '../test';
import { newProduct, Product, ProductStore } from '../test/mock-data';
import { calculateSortSpec, ColumnDef, MaterialTable } from '../MaterialTable';
import { MasterDetail, MasterDetailChildProps } from './MasterDetail';

const productStore = new ProductStore();

const Master = ({
    selectionContext,
    onEntitySelected,
}: MasterDetailChildProps<Product>) => {
    const columnDefs: Array<ColumnDef<Product>> = [
        {
            field: 'name',
            headerName: 'Product',
        },
    ];

    const handleEntityClicked = (entity: Product) => {
        onEntitySelected(entity);
    };

    const sortSpec = calculateSortSpec(columnDefs);
    const entityList = productStore.getEntities(sortSpec);

    return (
        <MaterialTable
            entityList={entityList}
            columnDefs={columnDefs}
            selectedEntity={selectionContext.entity}
            onEntityClicked={handleEntityClicked}
        />
    );
};

const Detail = ({
    selectionContext,
    onEntitySelected,
    onEntityUpdated,
}: MasterDetailChildProps<Product>) => {
    const { entity, isNew } = selectionContext;

    const handleSave = () => {
        if (selectionContext.isNew) {
            // This is bit of a cheating - we are always returning an
            // existing product. However this is required to test the
            // "New" case too. If we don't return a saved product,
            // the detail component will render as blank.
            onEntitySelected(productStore.getEntity('M14') as Product);
        } else {
            onEntityUpdated();
        }
    };

    return (
        <Fragment>
            <h1>{isNew ? 'New' : 'Existing'}</h1>
            <h2>{entity.name}</h2>
            <button aria-label="Save" onClick={handleSave}>
                Save
            </button>
        </Fragment>
    );
};

describe('MasterDetail', () => {
    it('clicking on an item in master shows it in detail', () => {
        const { getByTestId } = render(
            <MasterDetail
                MasterComponent={Master}
                DetailComponent={Detail}
                createEntity={newProduct}
            />
        );

        // Select an item in master
        const master = getByTestId('master-container');
        fireEvent.click(getByText(master, 'Dark Side of the Moon'));

        // Make sure heading says "Existing"
        const detail = getByTestId('detail-container');
        const h1List = detail.getElementsByTagName('h1');
        expect(h1List[0].textContent).toBe('Existing');

        // Make sure content renders the item name
        const h2List = detail.getElementsByTagName('h2');
        expect(h2List[0].textContent).toBe('Dark Side of the Moon');
    });

    it('clicking on add button in master shows a new item in detail', () => {
        const { getByLabelText, getByTestId } = render(
            <MasterDetail
                MasterComponent={Master}
                DetailComponent={Detail}
                createEntity={newProduct}
            />
        );

        // Add a new item
        fireEvent.click(getByLabelText('Add'));

        // Make sure heading says "New"
        const detail = getByTestId('detail-container');
        const h1List = detail.getElementsByTagName('h1');
        expect(h1List[0].textContent).toBe('New');
    });

    it('saving a new item in detail makes it an existing item', async () => {
        const { getByLabelText, getByTestId } = render(
            <MasterDetail
                MasterComponent={Master}
                DetailComponent={Detail}
                createEntity={newProduct}
            />
        );

        // Add a new item
        fireEvent.click(getByLabelText('Add'));

        // Make sure heading says "New"
        const detail = getByTestId('detail-container');
        const h1List = detail.getElementsByTagName('h1');
        expect(h1List[0].textContent).toBe('New');

        // Save the new item
        fireEvent.click(getByLabelText('Save'));

        // Make sure heading says "Existing"
        expect(h1List[0].textContent).toBe('Existing');

        // Make sure content renders the item name
        // Note: This is because handleSave() selects item M14 (see above)
        const h2List = detail.getElementsByTagName('h2');
        expect(h2List[0].textContent).toBe('Dark Side of the Moon');
    });

    it('saving an existing item in detail saves it', async () => {
        const { getByLabelText, getByTestId } = render(
            <MasterDetail
                MasterComponent={Master}
                DetailComponent={Detail}
                createEntity={newProduct}
            />
        );

        // Select an item in master
        const master = getByTestId('master-container');
        fireEvent.click(getByText(master, 'MacBook Pro'));

        // Save the existing item
        fireEvent.click(getByLabelText('Save'));

        // Make sure content renders the item name
        const detail = getByTestId('detail-container');
        const h2List = detail.getElementsByTagName('h2');
        expect(h2List[0].textContent).toBe('MacBook Pro');
    });
});
