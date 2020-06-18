import { Entity } from './Entity';
import { SortSpec } from './SortSpec';

/**
 * A store of entities
 */
export interface EntityStore<T extends Entity> {
    size: () => number;
    getEntities: (sortSpec?: SortSpec) => Array<T>;
    getEntity: (entityId: string) => T | undefined;

    /**
     * This method will return dummy entities if they don't exist in the store.
     * That's why the returned array does not have any undefined values
     */
    getEntitiesForIds: (entityIds: Array<string>) => Array<T>;
}
