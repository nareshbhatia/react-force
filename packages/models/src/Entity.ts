import { arrayToKeySet, KeySet } from '@react-force/utils';

export interface Entity {
    id: string;
}

// ----- Helper Methods -----

export type ArrayOrNone<T> = Array<T> | null | undefined;

export const getEntityIds = (entities: ArrayOrNone<Entity>): Array<string> =>
    entities ? entities.map((entity) => entity.id) : [];

export const getEntityKeySet = (entities: ArrayOrNone<Entity>): KeySet =>
    arrayToKeySet(getEntityIds(entities));
