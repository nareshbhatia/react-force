import {
    productUnsortedColumnDefs,
    productColumnDefs,
    ProductStore,
} from '@react-force/mock-data';
import { getSortSpec } from '@react-force/models';
import React from 'react';
import { MaterialTable } from '../src';
import { fireEvent, render } from './utils';

const handleEntityClicked = jest.fn();
const productStore = new ProductStore();
const sortSpec = getSortSpec(productColumnDefs);
const entityList = productStore.getEntities(sortSpec);

describe('MaterialTable', () => {
    beforeEach(() => {
        handleEntityClicked.mockReset();
    });

    it('renders the correct number of rows', () => {
        const { container } = render(
            <MaterialTable
                entityList={entityList}
                columnDefs={productUnsortedColumnDefs}
                onEntityClicked={handleEntityClicked}
            />
        );

        const actualRowCount = container.querySelectorAll('tbody tr').length;
        const expectedRowCount = productStore.size();
        expect(actualRowCount).toBe(expectedRowCount);
    });

    it('calls onRowClicked when a row is clicked', () => {
        const { getByText } = render(
            <MaterialTable
                entityList={entityList}
                columnDefs={productColumnDefs}
                onEntityClicked={handleEntityClicked}
            />
        );

        fireEvent.click(getByText('Dark Side of the Moon'));
        expect(handleEntityClicked).toBeCalledWith(
            productStore.getEntity('M14')
        );
    });

    it('does not call onRowClicked if it is not specified', () => {
        const { getByText } = render(
            <MaterialTable
                entityList={entityList}
                columnDefs={productColumnDefs}
            />
        );

        fireEvent.click(getByText('Dark Side of the Moon'));
        expect(handleEntityClicked).not.toHaveBeenCalled();
    });
});
