import { Entity } from './Entity';
import { SortOrder, SortSpec } from './SortSpec';

/**
 * Definition of a column in a table. The table is assumed to be displaying
 * an entity.
 */
export interface ColumnDef<T extends Entity> {
    /** The name of the entity field associated with this column */
    field: string;

    /** The name to render in the column header */
    headerName: string;

    /** Sort order (optional) - set to 'asc' or 'desc' to sort by this column */
    sortOrder?: SortOrder;

    /** Cell alignment */
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';

    /** Cell width */
    width?: number;

    /** Function to render the content of the cell */
    cellRenderer?: (entity: T) => string;
}

/**
 * Given all the column definitions of a table, this function returns its
 * the sort specification. Finds the first column with a SortSpec
 */
export function getSortSpec<T extends Entity>(
    columnDefs: Array<ColumnDef<T>>
): SortSpec | undefined {
    const column = columnDefs.find(
        (columnDef) => columnDef.sortOrder !== undefined
    );
    return column
        ? {
              field: column.field,
              order: column.sortOrder as SortOrder,
          }
        : undefined;
}
