import { Entity, EntityId } from './Entity';

export type SortOrder = 'asc' | 'desc';

export interface SortSpec {
    field: string;
    order: SortOrder;
}

export interface EntityStore<T extends Entity> {
    size: () => number;
    getEntities: (sortSpec?: SortSpec) => Array<T>;
    getEntity: (entityId: EntityId) => T | undefined;

    /**
     * This method will return dummy entities if they don't exist in the store.
     * That's why the returned array does not have any undefined values
     */
    getEntitiesForIds: (entityIds: Array<EntityId>) => Array<T>;
}
