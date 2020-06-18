import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { storiesOf } from '@storybook/react';
import { Product, productColumnDefs, ProductStore } from '../test/mock-data';
import { StoryDecorator } from '../stories';
import { calculateSortSpec, MaterialTable } from './MaterialTable';

const productStore = new ProductStore();

const MaterialTableExample = () => {
    const [selectedEntity, setSelectedEntity] = useState<Product | undefined>();

    const handleEntityClicked = (entity: Product) => {
        setSelectedEntity(entity);
    };

    const sortSpec = calculateSortSpec(productColumnDefs);
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

storiesOf('MaterialTable', module)
    .addDecorator(StoryDecorator)
    .add('Example', () => <MaterialTableExample />);
