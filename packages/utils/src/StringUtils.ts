/**
 * Returns an error message from any passed object
 */
const errorToString = (error: any) => {
    let result = 'Something went wrong';

    if (error instanceof Error) {
        result = error.message;
    } else if (typeof error === 'string') {
        result = error;
    }

    return result;
};

/**
 * Returns a random string of specified length
 * (based on https://stackoverflow.com/a/1349426/293680)
 *
 * @param length
 */
const getRandomString = (length: number): string => {
    let result = '';
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
};

/**
 * isBlank
 * -------
 * Returns true if string is undefined or null or it's trimmed length is 0.
 * So whitespace-only strings will return true.
 *
 * Examples:
 *   isBlank(undefined)   // => true
 *   isBlank(null)        // => true
 *   isBlank('')          // => true
 *   isBlank('  ')        // => true
 *   isBlank('bob')       // => false
 *   isBlank('  bob  ')   // => false
 */
const isBlank = (str: string | undefined | null): boolean => {
    return !str || str.trim().length === 0;
};

/**
 * isEmpty
 * -------
 * Returns true if string is undefined or null or it's length is 0
 * So whitespace-only strings will return false.
 *
 * Examples:
 *   isEmpty(undefined)   // => true
 *   isEmpty(null)        // => true
 *   isEmpty('')          // => true
 *   isEmpty('  ')        // => false
 *   isEmpty('bob')       // => false
 *   isEmpty('  bob  ')   // => false
 */
const isEmpty = (str: string | undefined | null): boolean => {
    return !str || str.length === 0;
};

/**
 * sanitizeString
 * --------------
 * Returns a trimmed string.
 * If trimmed string has zero length, returns null.
 *
 * Examples:
 *   sanitizeString(undefined)   // => null
 *   sanitizeString(null)        // => null
 *   sanitizeString('')          // => null
 *   sanitizeString('  ')        // => null
 *   sanitizeString('bob')       // => 'bob'
 *   sanitizeString('  bob  ')   // => 'bob'
 */
const sanitizeString = (str: string | undefined | null): string | null => {
    if (!str) {
        return null;
    }

    const trimmedString = str.trim();
    return trimmedString.length > 0 ? trimmedString : null;
};

export const StringUtils = {
    errorToString,
    getRandomString,
    isBlank,
    isEmpty,
    sanitizeString,
};
