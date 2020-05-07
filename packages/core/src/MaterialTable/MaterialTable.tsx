import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table, { TableProps } from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import classNames from 'classnames';
import { Entity, EntityId, SortOrder, SortSpec } from '../models';

/**
 * table: {
 *     // Set by Material UI, table expands to the container
 *     width: 100%
 *
 *     // Columns with specified width get that exact width
 *     // Remaining space is divided equally within other columns
 *     tableLayout: fixed
 * }
 *
 * // Prevent cells from wrapping, show overflow characters with ellipsis
 * cell: {
 *     whiteSpace: 'nowrap',
 *     overflow: 'hidden',
 *     textOverflow: 'ellipsis'
 * }
 */
const useStyles = makeStyles({
    table: {
        tableLayout: 'fixed',
    },
    cell: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
});

export interface ColumnDef<T extends Entity> {
    /** The name of the entity field associated with this column */
    field: string;

    /** The name to render in the column header */
    headerName: string;

    /** Set to 'asc' or 'desc' to sort by this column */
    sortOrder?: SortOrder;

    /** Cell alignment */
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';

    /** Cell width */
    width?: number;

    /** Function to render the cell */
    cellRenderer?: (entity: T) => string;
}

/** Calculate the sort specification based on the specified columnDefs */
export function calculateSortSpec<T extends Entity>(
    columnDefs: Array<ColumnDef<T>>
): SortSpec | undefined {
    const columnDefWithSort = columnDefs.find(
        (columnDef) => columnDef.sortOrder !== undefined
    );
    return columnDefWithSort
        ? {
              field: columnDefWithSort.field,
              order: columnDefWithSort.sortOrder as SortOrder,
          }
        : undefined;
}

export interface MaterialTableProps<T extends Entity> extends TableProps {
    entityList: Array<T>;
    columnDefs: Array<ColumnDef<T>>;
    selectedEntityId?: EntityId;
    onEntityClicked?: (entityId: EntityId) => void;
    // TODO: implement this
    onSortChanged?: (field: string, sortOrder: SortOrder | 'none') => void;
}

export function MaterialTable<T extends Entity>(props: MaterialTableProps<T>) {
    const classes = useStyles();
    const {
        className: classNameProp,
        entityList,
        columnDefs,
        selectedEntityId,
        onEntityClicked,
        ...rest
    } = props;

    // Note that width is only needed in the header row
    return (
        <Table className={classNames(classes.table, classNameProp)} {...rest}>
            <TableHead>
                <TableRow>
                    {columnDefs.map((columnDef) => (
                        <TableCell
                            key={columnDef.field}
                            className={classes.cell}
                            align={columnDef.align}
                            style={
                                columnDef.width
                                    ? { width: columnDef.width }
                                    : undefined
                            }
                        >
                            {columnDef.headerName}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {entityList.map((entity) => (
                    <TableRow
                        key={entity.id}
                        hover
                        selected={entity.id === selectedEntityId}
                        onClick={() => {
                            if (onEntityClicked) onEntityClicked(entity.id);
                        }}
                    >
                        {columnDefs.map((columnDef) => (
                            <TableCell
                                key={columnDef.field}
                                className={classes.cell}
                                align={columnDef.align}
                            >
                                {columnDef.cellRenderer
                                    ? columnDef.cellRenderer(entity)
                                    : (entity as any)[columnDef.field]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
