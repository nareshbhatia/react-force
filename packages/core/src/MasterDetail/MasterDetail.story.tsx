import React, { useState } from 'react';
import { ColumnDef, getSortSpec } from '@react-force/models';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { MessageFactory } from '@react-force/models';
import { storiesOf } from '@storybook/react';
import { ViewVerticalContainer } from '../Containers';
import { useMessageSetter } from '../contexts';
import { MaterialTable } from '../MaterialTable';
import { StoryDecorator } from '../stories';
import { newProduct, Product, ProductStore } from '../test/mock-data';
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
            width: 250,
        },
        {
            field: 'manufacturer',
            headerName: 'Company',
            sortOrder: 'asc',
        },
    ];

    const handleEntityClicked = (entity: Product) => {
        onEntitySelected(entity);
    };

    const sortSpec = getSortSpec(columnDefs);
    const entityList = productStore.getEntities(sortSpec);

    return (
        <Box p={1}>
            <MaterialTable
                entityList={entityList}
                columnDefs={columnDefs}
                selectedEntity={selectionContext.entity}
                onEntityClicked={handleEntityClicked}
            />
        </Box>
    );
};

const Detail = ({
    selectionContext,
    onEntitySelected,
    onEntityUpdated,
}: MasterDetailChildProps<Product>) => {
    const setMessage = useMessageSetter();
    const [product, setProduct] = useState<Product>(selectionContext.entity);

    const handleChange = (name: string) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setProduct({ ...product, [name]: event.target.value });
    };

    const handleSave = () => {
        if (selectionContext.isNew) {
            // This is bit of a cheating - we are always returning an
            // existing product. However this is required to test the
            // "New" case too. If we don't return a saved product,
            // the detail component will render as blank.
            setMessage(MessageFactory.success('Product created'));
            onEntitySelected(productStore.getEntity('M14') as Product);
        } else {
            setMessage(MessageFactory.success('Product saved'));
            onEntityUpdated();
        }
    };

    const handleCancel = () => {
        setProduct(selectionContext.entity);
        setMessage(MessageFactory.success('Edits canceled'));
    };

    return (
        <Box p={2}>
            <Typography variant="h6" component="h2">
                {selectionContext.isNew ? 'Add Product' : 'Edit Product'}
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
                createEntity={newProduct}
            />
        </ViewVerticalContainer>
    ));
