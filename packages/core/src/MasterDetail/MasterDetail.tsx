import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import React, { useState } from 'react';
import { HorizontalContainer, ScrollingContainer } from '../Containers';
import { FloatingAddButton } from '../FloatingAddButton';

/**
 * The MasterDetail component has two children - Master and Detail. Both
 * children can display one or more entities.
 *
 * MasterDetail has the concept of selection - you can have zero selections
 * or one selection.
 *
 * Zero selections is generally the case when a new entity is being created
 * and does not have an id yet. In this case, the selectionContext will have
 * the following value:
 * {
 *     isNew: true
 *     type: optional,
 *     entityId: ''
 *     version: 0
 * }
 *
 * When an existing entity is selected, the selectionContext will have the
 * following value:
 * {
 *     isNew: false
 *     type: undefined,
 *     entityId: existing entity's id
 *     version: 0..n
 * }
 *
 * The selectionContext is passed to child components so that they can
 * control their presentation and behavior. Child components should never
 * change the selectionContext directly. In order to change it, they can use
 * the following props:
 *
 * Each child component has the ability to change the selected entity by calling
 * onEntitySelected(). For example, the Master can select an entity when the
 * entity is selected from a list. The Detail can select an entity when it
 * creates a new one and wants it to be the selected one. Note that the
 * selected entity must always have an id, so an id must be assigned to it
 * before selection (e.g. by saving it in the database).
 *
 * MasterDetail component can also initiate the creation of a new entity
 * using an optional Add button.
 */

export interface SelectionContext {
    /** is a new Entity being created (i.e. it doesn't have an id yet) */
    isNew: boolean;

    /**
     * specific type of entity that is being created. Use when entity
     * has sub-types, e.g. Fruit can be Apple or Banana.
     */
    type?: string;

    /** selected entity's id (empty string for a new entity) */
    entityId: string;

    /**
     * Child components have the ability to tell the parent that the selected
     * entity has been updated. This causes the version number in the context
     * to be incremented resulting in the creation of a new detail component.
     * This is important to erase any stale state held in the detail component.
     */
    version: number;
}

export interface MasterDetailChildProps {
    selectionContext: SelectionContext;

    // Requests parent to start the creation of a new entity.
    // Parent changes selectionContext to:
    // {
    //    isNew: true
    //    type: type,
    //    entityId: ''
    //    version: 0
    // }
    onStartNewEntity: (type?: string) => void;

    // Informs parent that an existing entity has been selected.
    // Parent changes selectionContext to:
    // {
    //    isNew: false
    //    type: undefined,
    //    entityId: entityId
    //    version: 0
    // }
    onEntitySelected: (entityId: string) => void;

    // Informs parent that an existing entity has been updated.
    // Parent changes selectionContext to:
    // {
    //    isNew: false
    //    type: undefined,
    //    entityId: entityId
    //    version: version + 1
    // }
    onEntityUpdated: () => void;
}

export interface MasterDetailProps {
    MasterComponent: React.FC<MasterDetailChildProps>;

    DetailComponent: React.FC<MasterDetailChildProps>;

    // Width of master component. For supported values, see
    // https://material-ui.com/system/sizing/#supported-values
    masterWidth?: number | string;

    hideAddEntityButton?: boolean;
}

export function MasterDetail({
    MasterComponent,
    DetailComponent,
    masterWidth,
    hideAddEntityButton,
}: MasterDetailProps) {
    const [selectionContext, setSelectionContext] = useState<SelectionContext>({
        isNew: true,
        entityId: '',
        version: 0,
    });

    const handleStartNewEntity = (type?: string) => {
        setSelectionContext({
            isNew: true,
            type,
            entityId: '',
            version: 0,
        });
    };

    const handleEntitySelected = (entityId: string) => {
        setSelectionContext({ isNew: false, entityId, version: 0 });
    };

    const handleEntityUpdated = () => {
        const { entityId, version } = selectionContext;
        setSelectionContext({ isNew: false, entityId, version: version + 1 });
    };

    const handleAddButtonClicked = () => {
        handleStartNewEntity();
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
                        onStartNewEntity={handleStartNewEntity}
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
                    key={`${selectionContext.entityId}-${selectionContext.version}`}
                    selectionContext={selectionContext}
                    onStartNewEntity={handleStartNewEntity}
                    onEntitySelected={handleEntitySelected}
                    onEntityUpdated={handleEntityUpdated}
                />
            </ScrollingContainer>
        </HorizontalContainer>
    );
}
