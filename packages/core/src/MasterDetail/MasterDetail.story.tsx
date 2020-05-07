import React, { useState } from 'react';
import { ViewVerticalContainer } from '../Containers';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { storiesOf } from '@storybook/react';
import { useMessageContext } from '../contexts';
import { JsProduct, Product, ProductStore } from '../test/mock-data';
import { EntityId, MessageFactory } from '../models';
import { StoryDecorator } from '../stories';
import { calculateSortSpec, ColumnDef, MaterialTable } from '../MaterialTable';
import {
    MasterDetail,
    MasterDetailChildProps,
    SelectedEntity,
} from './MasterDetail';

const productStore = new ProductStore();

const getProduct = (selectedEntity: SelectedEntity): JsProduct | undefined => {
    const { entityId, isNew } = selectedEntity;

    const product = isNew
        ? new Product(entityId)
        : productStore.getEntity(entityId);

    if (product) {
        const jsProduct: JsProduct = product.serialize() as JsProduct;
        jsProduct.id = product.id;
        return jsProduct;
    } else {
        return undefined;
    }
};

const Master = ({
    selectedEntity,
    onEntitySelected,
}: MasterDetailChildProps) => {
    const columnDefs: Array<ColumnDef<Product>> = [
        {
            field: 'name',
            headerName: 'Product',
            width: 250,
        },
        {
            field: 'manufacturer',
            headerName: 'Company',
            sortOrder: 'asc',
        },
    ];

    const handleEntityClicked = (entityId: EntityId) => {
        onEntitySelected(entityId);
    };

    const sortSpec = calculateSortSpec(columnDefs);
    const entityList = productStore.getEntities(sortSpec);

    return (
        <Box p={1}>
            <MaterialTable
                entityList={entityList}
                columnDefs={columnDefs}
                selectedEntityId={selectedEntity.entityId}
                onEntityClicked={handleEntityClicked}
            />
        </Box>
    );
};

const Detail = ({
    selectedEntity,
    onEntitySelected,
    onEntityUpdated,
}: MasterDetailChildProps) => {
    const messageContextValue = useMessageContext();
    const [product, setProduct] = useState<JsProduct | undefined>(
        getProduct(selectedEntity)
    );

    if (!product) {
        return null;
    }

    const handleChange = (name: string) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setProduct({ ...product, [name]: event.target.value });
    };

    const handleSave = () => {
        if (selectedEntity.isNew) {
            // This is bit of a cheating - we are always returning an
            // existing product. However this is required to test the
            // "New" case too. If we don't return a saved product,
            // the detail component will render as blank.
            messageContextValue.setMessage(
                MessageFactory.success('Product created')
            );
            onEntitySelected('M14');
        } else {
            messageContextValue.setMessage(
                MessageFactory.success('Product saved')
            );
            onEntityUpdated();
        }
    };

    const handleCancel = () => {
        setProduct(getProduct(selectedEntity));
        messageContextValue.setMessage(
            MessageFactory.success('Edits canceled')
        );
    };

    return (
        <Box p={2}>
            <Typography variant="h6" component="h2">
                {selectedEntity.isNew ? 'Add Product' : 'Edit Product'}
            </Typography>
            <form>
                <TextField
                    name="name"
                    value={product.name}
                    type="text"
                    label="Name"
                    margin="normal"
                    fullWidth
                    onChange={handleChange('name')}
                />
                <TextField
                    name="department"
                    value={product.department}
                    type="text"
                    label="Department"
                    margin="normal"
                    fullWidth
                    onChange={handleChange('department')}
                />
                <TextField
                    name="manufacturer"
                    value={product.manufacturer}
                    type="text"
                    label="Manufacturer"
                    margin="normal"
                    fullWidth
                    onChange={handleChange('manufacturer')}
                />
                <TextField
                    name="price"
                    value={product.price}
                    type="number"
                    label="Price"
                    margin="normal"
                    fullWidth
                    onChange={handleChange('price')}
                />

                <Box mt={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

storiesOf('MasterDetail', module)
    .addDecorator(StoryDecorator)
    .add('Example', () => (
        <ViewVerticalContainer>
            <MasterDetail
                MasterComponent={Master}
                DetailComponent={Detail}
                masterWidth={400}
            />
        </ViewVerticalContainer>
    ));
