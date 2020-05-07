import { StringMap } from './StringMap';

describe('StringMap', () => {
    it('maps keys of type string to values of type string', () => {
        const searchParams: StringMap = {
            department: 'electronics',
            category: 'computers',
            sortBy: 'ratings',
        };

        expect(searchParams.category).toBe('computers');
    });
});
