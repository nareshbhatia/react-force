import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { v4 as uuidv4 } from 'uuid';
import { EntityId } from '../models';
import { HorizontalContainer, ScrollingContainer } from '../Containers';
import { FloatingAddButton } from '../FloatingAddButton';

/**
 * The MasterDetail component has two children - Master and Detail.
 *
 * Both children can display one or more entities. However there can only be
 * one selected entity at a time. The MasterDetail component maintains which
 * entity is selected and passes it on to the child components.
 *
 * Each child component has the ability to change the selected entity by calling
 * onEntitySelected(). For example, the Master can select an entity when the
 * entity is selected from a list. The Detail can select an entity when it
 * creates a new one and wants it to be selected.
 *
 * Each child component has the ability to tell the parent that the selected
 * entity has been updated. This causes the version number of the entity
 * to be incremented and a new instance of the detail component to be created.
 * This is important to erase any stale state held in the detail component.
 *
 * MasterDetail also has the ability to initiate the creation of a new entity
 * using an (optional) add button. The state of such an entity will be set to
 * new.
 *
 * @param MasterComponent
 * @param DetailComponent
 * @param masterWidth (optional)
 * @param hideAddEntityButton (optional, default=false)
 */

export interface SelectedEntity {
    entityId: EntityId;
    type?: string;
    isNew: boolean;
    version: number;
}

export interface MasterDetailChildProps {
    selectedEntity: SelectedEntity;

    // Sets state to {uuidv4(), type, isNew: true, version: 0}
    onCreateNewEntity: (type?: string) => void;

    // Sets state to {entityId, isNew: false, version: 0}
    onEntitySelected: (entityId: EntityId) => void;

    // Increments selected entity's version number
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

export const MasterDetail = ({
    MasterComponent,
    DetailComponent,
    masterWidth,
    hideAddEntityButton,
}: MasterDetailProps) => {
    const [selectedEntity, setSelectedEntity] = useState<SelectedEntity>({
        entityId: uuidv4(),
        isNew: true,
        version: 0,
    });

    const handleCreateNewEntity = (type?: string) => {
        setSelectedEntity({
            entityId: uuidv4(),
            type,
            isNew: true,
            version: 0,
        });
    };

    const handleEntitySelected = (entityId: EntityId) => {
        const { type } = selectedEntity;
        setSelectedEntity({ entityId, type, isNew: false, version: 0 });
    };

    const handleEntityUpdated = () => {
        const { entityId, type, version } = selectedEntity;
        setSelectedEntity({
            entityId,
            type,
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
                        selectedEntity={selectedEntity}
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
                    key={`${selectedEntity.entityId}-${selectedEntity.version}`}
                    selectedEntity={selectedEntity}
                    onCreateNewEntity={handleCreateNewEntity}
                    onEntitySelected={handleEntitySelected}
                    onEntityUpdated={handleEntityUpdated}
                />
            </ScrollingContainer>
        </HorizontalContainer>
    );
};
