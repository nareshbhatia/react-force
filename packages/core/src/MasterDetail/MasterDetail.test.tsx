import React, { Fragment } from 'react';
import { Product, ProductStore } from '@react-force/mock-data';
import { ColumnDef, getSortSpec } from '@react-force/models';
import { fireEvent, getByText, render } from '../test';
import { MaterialTable } from '../MaterialTable';
import { MasterDetail, MasterDetailChildProps } from './MasterDetail';

const productStore = new ProductStore();

const Master = ({
    selectionContext,
    onEntitySelected,
}: MasterDetailChildProps) => {
    const columnDefs: Array<ColumnDef<Product>> = [
        {
            field: 'name',
            headerName: 'Product',
        },
    ];

    const handleEntityClicked = (entity: Product) => {
        onEntitySelected(entity.id);
    };

    const sortSpec = getSortSpec(columnDefs);
    const entityList = productStore.getEntities(sortSpec);

    return (
        <MaterialTable<Product>
            entityList={entityList}
            columnDefs={columnDefs}
            selectedEntity={productStore.getEntity(selectionContext.entityId)}
            onEntityClicked={handleEntityClicked}
        />
    );
};

const Detail = ({
    selectionContext,
    onEntitySelected,
    onEntityUpdated,
}: MasterDetailChildProps) => {
    const { isNew, entityId } = selectionContext;

    // When isNew = true, we are always returning an existing product.
    // This is bit of a cheating, however it is required for this example
    // to work. If we don't return a saved product, the detail component
    // will render as blank.
    const entity = productStore.getEntity(isNew ? 'M14' : entityId);
    if (!entity) {
        return null;
    }

    const handleSave = () => {
        if (isNew) {
            onEntitySelected(entity.id);
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
            <MasterDetail MasterComponent={Master} DetailComponent={Detail} />
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
            <MasterDetail MasterComponent={Master} DetailComponent={Detail} />
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
            <MasterDetail MasterComponent={Master} DetailComponent={Detail} />
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
            <MasterDetail MasterComponent={Master} DetailComponent={Detail} />
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
