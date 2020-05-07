/**
 * A map from string to string (key-value pairs).
 * We use the TypeScript indexable type for this.
 * See https://www.typescriptlang.org/docs/handbook/interfaces.html
 * Based on https://stackoverflow.com/questions/13631557/typescript-objects-as-dictionary-types-as-in-c-sharp
 *
 * Example:
 * const searchParams = {
 *     department: 'electronics',
 *     category: 'computers',
 *     sortBy: 'ratings',
 * };
 */
export interface StringMap {
    [key: string]: string;
}
