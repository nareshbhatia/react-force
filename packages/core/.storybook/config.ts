import { configure } from '@storybook/react';
import '@storybook/addon-console';

function loadStories() {
    require('glob-loader!./stories.pattern');
}

configure(loadStories, module);
