import { Entity } from '@react-force/models';
import { v4 as uuidv4 } from 'uuid';

export interface Product extends Entity {
    name: string;
    department: string;
    manufacturer: string;
    price: number;
    isFeatured: boolean;
}

export const newProduct = (): Product => ({
    id: uuidv4(),
    name: '',
    department: '',
    manufacturer: '',
    price: 0,
    isFeatured: false,
});

/**
 * Finds a product in an array
 */
export const findProduct = (products: Array<Product>, id: string) =>
    products.find((product) => product.id === id);

/**
 * Adds a new product to an array of products and return a new array
 * (immutable update)
 */
export const addProduct = (products: Array<Product>, productToAdd: Product) =>
    products.slice().push(productToAdd);

/**
 * Updates a product in an array of products and return a new array
 * (immutable update)
 */
export const updateProduct = (
    products: Array<Product>,
    productToUpdate: Product
) =>
    products.map((product) =>
        product.id === productToUpdate.id ? productToUpdate : product
    );

/**
 * Removes a product from an array of products and return a new array
 * (immutable update)
 */
export const removeProduct = (
    products: Array<Product>,
    productToRemove: Product
) => products.filter((product) => product.id !== productToRemove.id);

/**
 * Sorts products by (manufacturer, name) and returns a new array
 * (immutable update)
 */
export const sortProducts = (products: Array<Product>) =>
    products.slice().sort((a: Product, b: Product) => {
        const result = a.manufacturer.localeCompare(b.manufacturer);
        return result !== 0 ? result : a.name.localeCompare(b.name);
    });
