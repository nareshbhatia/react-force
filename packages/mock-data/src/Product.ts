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
