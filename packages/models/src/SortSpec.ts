export type SortOrder = 'asc' | 'desc';

/**
 * A specification to sort a collection of entities by the specified field
 */
export interface SortSpec {
    field: string;
    order: SortOrder;
}
