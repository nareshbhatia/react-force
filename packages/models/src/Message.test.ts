import { MessageFactory } from './Message';

const messageText = 'Sample message';

describe('MessageFactory', () => {
    it('success() creates a success message', () => {
        expect(MessageFactory.success(messageText)).toEqual({
            type: 'success',
            text: messageText,
        });
    });

    it('warning() creates a warning message', () => {
        expect(MessageFactory.warning(messageText)).toEqual({
            type: 'warning',
            text: messageText,
        });
    });

    it('error() creates an error message', () => {
        expect(MessageFactory.error(messageText)).toEqual({
            type: 'error',
            text: messageText,
        });
    });

    it('info() creates an info message', () => {
        expect(MessageFactory.info(messageText)).toEqual({
            type: 'info',
            text: messageText,
        });
    });
});
