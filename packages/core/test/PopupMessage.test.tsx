import { MessageFactory } from '@react-force/models';
import React from 'react';
import { PopupMessage } from '../src';
import { render } from './utils';

const handleClose = jest.fn();

describe('<PopupMessage />', () => {
    it('does not render a popup if there is no message', () => {
        const { queryByRole } = render(<PopupMessage onClose={handleClose} />);
        expect(queryByRole('alert')).toBeNull();
    });

    it('renders a popup with the specified message', () => {
        const messageText = 'Username or password did not match';
        const message = MessageFactory.error(messageText);
        const { getByText, queryByRole } = render(
            <PopupMessage
                data-testid="login-failed"
                message={message}
                onClose={handleClose}
            />
        );
        expect(queryByRole('alert')).toBeInTheDocument();
        expect(getByText(messageText)).toBeInTheDocument();
    });
});
