import React from 'react';
import { MessageFactory } from '@react-force/models';
import { fireEvent, render } from '../test';
import { MessageProvider, useMessageSetter } from '../contexts';
import { MessageRenderer } from './MessageRenderer';

const messageText = 'Username or password did not match';
const message = MessageFactory.error(messageText);

const SignInPage = () => {
    const setMessage = useMessageSetter();

    const handleSignIn = () => {
        setMessage(message);
    };

    return (
        <div>
            <button aria-label="Sign In" onClick={handleSignIn}>
                Sign In
            </button>
        </div>
    );
};

const TestContainer = () => {
    return (
        <MessageProvider>
            <SignInPage />
            <MessageRenderer />
        </MessageProvider>
    );
};

describe('<MessageRenderer />', () => {
    it('does not render a popup if there is no message', () => {
        const { queryByRole } = render(<TestContainer />);
        expect(queryByRole('alert')).toBeNull();
    });

    it('renders a popup with the specified message', () => {
        const { getByLabelText, getByText, queryByRole } = render(
            <TestContainer />
        );

        // Click the Sign In button
        fireEvent.click(getByLabelText('Sign In'));

        expect(queryByRole('alert')).toBeInTheDocument();
        expect(getByText(messageText)).toBeInTheDocument();

        // Click the Close icon to close the alert
        fireEvent.click(getByLabelText('Close'));
        expect(queryByRole('alert')).toBeNull();
    });
});
