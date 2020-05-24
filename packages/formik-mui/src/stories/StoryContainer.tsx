import React from 'react';
import Box from '@material-ui/core/Box';

export const StoryContainer = (story: any) => <Box p={1}>{story()}</Box>;
