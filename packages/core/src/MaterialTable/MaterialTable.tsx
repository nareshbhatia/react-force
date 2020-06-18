import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table, { TableProps } from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { ColumnDef, Entity, SortOrder } from '@react-force/models';
import classNames from 'classnames';

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

export interface MaterialTableProps<T extends Entity> extends TableProps {
    entityList: Array<T>;
    columnDefs: Array<ColumnDef<T>>;
    selectedEntity?: T;
    onEntityClicked?: (entity: T) => void;
    // TODO: implement this
    onSortChanged?: (field: string, sortOrder: SortOrder | 'none') => void;
}

export function MaterialTable<T extends Entity>(props: MaterialTableProps<T>) {
    const classes = useStyles();
    const {
        className: classNameProp,
        entityList,
        columnDefs,
        selectedEntity,
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
                        selected={entity === selectedEntity}
                        onClick={() => {
                            if (onEntityClicked) onEntityClicked(entity);
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
