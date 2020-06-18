import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { Entity } from '@react-force/models';
import { HorizontalContainer, ScrollingContainer } from '../Containers';
import { FloatingAddButton } from '../FloatingAddButton';

/**
 * The MasterDetail component has two children - Master and Detail.
 *
 * Both children can display one or more entities. However there can only be
 * one selected entity at any time. A reference to this entity is kept in the
 * SelectionContext which is maintained by the MasterDetail component.
 *
 * Each child component has the ability to change the selected entity by calling
 * onEntitySelected(). For example, the Master can select an entity when the
 * entity is selected from a list. The Detail can select an entity when it
 * creates a new one and wants it to be the selected one.
 *
 * MasterDetail also has the ability to initiate the creation of a new entity
 * using an (optional) add button. In this case SelectionContext.isNew will be
 * set to true.
 *
 * @param MasterComponent
 * @param DetailComponent
 * @param masterWidth (optional)
 * @param hideAddEntityButton (optional, default=false)
 */

/**
 * A function that returns a new entity of type T.
 * The optional parameter type can be used to control the exact type of entity
 * that is created.
 */
export type EntityFactory<T extends Entity> = (type?: string) => T;

export interface SelectionContext<T extends Entity> {
    /** the selected entity */
    entity: T;

    /** is this a new Entity (e.g. not yet saved in the database */
    isNew: boolean;

    /**
     * Child components have the ability to tell the parent that the selected
     * entity has been updated. This causes the version number in the context
     * to be incremented resulting in the creation of a new detail component.
     * This is important to erase any stale state held in the detail component.
     */
    version: number;
}

export interface MasterDetailChildProps<T extends Entity> {
    selectionContext: SelectionContext<T>;

    // Creates a new entity with an optional type.
    // Sets context to {entity, isNew: true, version: 0}
    onCreateNewEntity: (type?: string) => void;

    // Sets context to {entity, isNew: false, version: 0}
    onEntitySelected: (entity: T) => void;

    // Increments selected entity's version number
    onEntityUpdated: () => void;
}

export interface MasterDetailProps<T extends Entity> {
    MasterComponent: React.FC<MasterDetailChildProps<T>>;

    DetailComponent: React.FC<MasterDetailChildProps<T>>;

    // Width of master component. For supported values, see
    // https://material-ui.com/system/sizing/#supported-values
    masterWidth?: number | string;

    hideAddEntityButton?: boolean;

    createEntity: EntityFactory<T>;
}

export function MasterDetail<T extends Entity>({
    MasterComponent,
    DetailComponent,
    masterWidth,
    hideAddEntityButton,
    createEntity,
}: MasterDetailProps<T>) {
    const [selectionContext, setSelectionContext] = useState<
        SelectionContext<T>
    >({
        entity: createEntity(),
        isNew: true,
        version: 0,
    });

    const handleCreateNewEntity = (type?: string) => {
        setSelectionContext({
            entity: createEntity(type),
            isNew: true,
            version: 0,
        });
    };

    const handleEntitySelected = (entity: T) => {
        setSelectionContext({ entity, isNew: false, version: 0 });
    };

    const handleEntityUpdated = () => {
        const { entity, version } = selectionContext;
        setSelectionContext({
            entity,
            isNew: false,
            version: version + 1,
        });
    };

    const handleAddButtonClicked = () => {
        handleCreateNewEntity();
    };

    // Note: Need minHeight={0} on the parent of each scrolling container,
    // otherwise table does not expand correctly when window height changes.
    return (
        <HorizontalContainer minHeight={0}>
            <Box
                display="flex"
                flexDirection="column"
                width={masterWidth}
                minHeight={0}
                position="relative"
            >
                <ScrollingContainer data-testid="master-container">
                    <MasterComponent
                        selectionContext={selectionContext}
                        onCreateNewEntity={handleCreateNewEntity}
                        onEntitySelected={handleEntitySelected}
                        onEntityUpdated={handleEntityUpdated}
                    />
                </ScrollingContainer>
                {!hideAddEntityButton && (
                    <FloatingAddButton onClick={handleAddButtonClicked} />
                )}
            </Box>
            <Divider orientation="vertical" />
            <ScrollingContainer flex="1" data-testid="detail-container">
                <DetailComponent
                    key={`${selectionContext.entity.id}-${selectionContext.version}`}
                    selectionContext={selectionContext}
                    onCreateNewEntity={handleCreateNewEntity}
                    onEntitySelected={handleEntitySelected}
                    onEntityUpdated={handleEntityUpdated}
                />
            </ScrollingContainer>
        </HorizontalContainer>
    );
}
