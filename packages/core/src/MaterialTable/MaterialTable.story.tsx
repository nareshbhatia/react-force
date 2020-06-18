import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { storiesOf } from '@storybook/react';
import { productColumnDefs, ProductStore } from '../test/mock-data';
import { StoryDecorator } from '../stories';
import { calculateSortSpec, MaterialTable } from './MaterialTable';

const productStore = new ProductStore();

const MaterialTableExample = () => {
    const [selectedEntityId, setSelectedEntityId] = useState<
        string | undefined
    >();

    const handleEntityClicked = (entityId: string) => {
        setSelectedEntityId(entityId);
    };

    const sortSpec = calculateSortSpec(productColumnDefs);
    const entityList = productStore.getEntities(sortSpec);

    return (
        <Box width={600}>
            <MaterialTable
                entityList={entityList}
                columnDefs={productColumnDefs}
                selectedEntityId={selectedEntityId}
                onEntityClicked={handleEntityClicked}
            />
        </Box>
    );
};

storiesOf('MaterialTable', module)
    .addDecorator(StoryDecorator)
    .add('Example', () => <MaterialTableExample />);
