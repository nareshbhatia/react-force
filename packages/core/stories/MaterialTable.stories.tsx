import Box from '@material-ui/core/Box';
import {
    Product,
    productColumnDefs,
    ProductStore,
} from '@react-force/mock-data';
import { getSortSpec } from '@react-force/models';
import React, { useState } from 'react';
import { MaterialTable } from '../src';

const productStore = new ProductStore();

const metadata = {
    component: MaterialTable,
    title: 'core/MaterialTable',
    parameters: {
        layout: 'fullscreen',
    },
};
export default metadata;

export const MaterialTableStory = () => {
    const [selectedEntity, setSelectedEntity] = useState<Product | undefined>();

    const handleEntityClicked = (entity: Product) => {
        setSelectedEntity(entity);
    };

    const sortSpec = getSortSpec(productColumnDefs);
    const entityList = productStore.getEntities(sortSpec);

    return (
        <Box width={600}>
            <MaterialTable<Product>
                entityList={entityList}
                columnDefs={productColumnDefs}
                selectedEntity={selectedEntity}
                onEntityClicked={handleEntityClicked}
            />
        </Box>
    );
};
MaterialTableStory.storyName = 'MaterialTable';
