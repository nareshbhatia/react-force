import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { getSortSpec } from '@react-force/models';
import {
    Product,
    productColumnDefs,
    ProductStore,
} from '@react-force/mock-data';
import { storiesOf } from '@storybook/react';
import { StoryDecorator } from '../stories';
import { MaterialTable } from './MaterialTable';

const productStore = new ProductStore();

const MaterialTableExample = () => {
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

storiesOf('MaterialTable', module)
    .addDecorator(StoryDecorator)
    .add('Example', () => <MaterialTableExample />);
