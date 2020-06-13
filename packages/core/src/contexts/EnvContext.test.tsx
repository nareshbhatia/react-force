import React from 'react';
import { render } from '../test';
import { EnvProvider, useEnv } from './EnvContext';

const varName = 'USERNAME';
const varValue = 'john';

const ProfilePage = () => {
    const env = useEnv();

    return <div data-testid="username">{env.get(varName)}</div>;
};

const TestContainer = () => {
    return (
        <EnvProvider>
            <ProfilePage />
        </EnvProvider>
    );
};

describe('<EnvContext />', () => {
    it('provides environment variables with values', () => {
        // Set username in window environment
        (window as any)._env_ = {
            USERNAME: varValue,
        };

        const { getByTestId } = render(<TestContainer />);

        expect(getByTestId('username').textContent).toBe(varValue);
    });
});
