import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Product, ProductStore } from '@react-force/mock-data';
import { ColumnDef, getSortSpec, MessageFactory } from '@react-force/models';
import React, { useState } from 'react';
import {
    MasterDetail,
    MasterDetailChildProps,
    MaterialTable,
    useMessageSetter,
    ViewVerticalContainer,
} from '../src';

const productStore = new ProductStore();

const metadata = {
    component: MasterDetail,
    title: 'core/MasterDetail',
    parameters: {
        layout: 'fullscreen',
    },
};
export default metadata;

const Master = ({
    selectionContext,
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

    const handleEntityClicked = (entity: Product) => {
        onEntitySelected(entity.id);
    };

    const sortSpec = getSortSpec(columnDefs);
    const entityList = productStore.getEntities(sortSpec);

    return (
        <Box p={1}>
            <MaterialTable<Product>
                entityList={entityList}
                columnDefs={columnDefs}
                selectedEntity={productStore.getEntity(
                    selectionContext.entityId
                )}
                onEntityClicked={handleEntityClicked}
            />
        </Box>
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
    const entity = productStore.getEntity(isNew ? 'M14' : entityId) as Product;

    const setMessage = useMessageSetter();
    const [product, setProduct] = useState<Product>(entity);

    /** handle change in form fields */
    const handleChange = (name: string) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setProduct({ ...product, [name]: event.target.value });
    };

    const handleSave = () => {
        if (isNew) {
            setMessage(MessageFactory.success('Product created'));
            onEntitySelected(entity.id);
        } else {
            setMessage(MessageFactory.success('Product saved'));
            onEntityUpdated();
        }
    };

    const handleCancel = () => {
        setProduct(entity);
        setMessage(MessageFactory.success('Edits canceled'));
    };

    return (
        <Box p={2}>
            <Typography variant="h6" component="h2">
                {isNew ? 'Add Product' : 'Edit Product'}
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

export const MasterDetailStory = () => {
    return (
        <ViewVerticalContainer>
            <MasterDetail
                MasterComponent={Master}
                DetailComponent={Detail}
                masterWidth={400}
            />
        </ViewVerticalContainer>
    );
};
MasterDetailStory.storyName = 'MasterDetail';
