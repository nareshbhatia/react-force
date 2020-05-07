import { Entity, EntityId } from '../../models';

export interface JsProduct {
    id: EntityId;
    name: string;
    department: string;
    manufacturer: string;
    price: number;
    isFeatured: boolean;
}

/* istanbul ignore next */
export class Product implements Entity {
    constructor(
        public id: EntityId = '',
        public name: string = '',
        public department: string = '',
        public manufacturer: string = '',
        public price: number = 0,
        public isFeatured: boolean = false
    ) {}

    serialize = () => ({
        name: this.name,
        department: this.department,
        manufacturer: this.manufacturer,
        price: this.price,
        isFeatured: this.isFeatured,
    });
}
