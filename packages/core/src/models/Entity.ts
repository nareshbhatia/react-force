import { arrayToKeySet, KeySet } from '@react-force/utils';

export type EntityId = string;

export interface Entity {
    id: EntityId;

    // Returns a serialized version of the entity with no id
    serialize: () => any;
}

// ----- Helper Methods -----

export type ArrayOrNone<T> = Array<T> | null | undefined;

export const getEntityIds = (entities: ArrayOrNone<Entity>): Array<EntityId> =>
    entities ? entities.map((entity) => entity.id) : [];

export const getEntityKeySet = (entities: ArrayOrNone<Entity>): KeySet =>
    arrayToKeySet(getEntityIds(entities));

/**
 * A function that takes an id and a jsValue and returns an entity with an embedded id
 */
export type DeserializeFn = (id: EntityId, jsValue: any) => Entity;
