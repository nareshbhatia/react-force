import { ArrayOrNone, arrayToKeySet, KeySet } from '@react-force/utils';

/**
 * A domain entity with an id
 */
export interface Entity {
    id: string;
}

/**
 * A function that takes an Entity and returns a jsValue
 */
export type Serializer<T extends Entity> = (entity: T) => any;

/**
 * A function that takes an id and a jsValue and returns an entity with an embedded id
 */
export type Deserializer<T extends Entity> = (id: string, jsValue: any) => T;

// ----- Helper Methods -----
export const getEntityIds = (entities: ArrayOrNone<Entity>): Array<string> =>
    entities ? entities.map((entity) => entity.id) : [];

export const getEntityKeySet = (entities: ArrayOrNone<Entity>): KeySet =>
    arrayToKeySet(getEntityIds(entities));
