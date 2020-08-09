import numeral from 'numeral';

/**
 * Formats a number based on the specified format string
 * Example: format(999.60, '0,0') --> 1,000
 * @param value
 * @param format
 */
function format(value: number, format: string): string {
    return numeral(value).format(format);
}

/**
 * Formats value as a comma-separated number with 2 decimal digits
 * Example: 1000 --> 1,000.00
 * @param value
 */
function formatAsMoney(value: number) {
    return numeral(value).format('0,0.00');
}

/**
 * Formats value with plus of minus sign
 * Examples:
 *      1 --> '+1'
 *     -1 --> '-1'
 * @param value
 */
function formatWithSign(value: number) {
    return numeral(value).format('+0.[0000]');
}

/**
 * Formats value as an abbreviation
 * Examples:
 *     100000 --> 100k
 * @param value
 */
function formatWithAbbreviation(value: number) {
    return numeral(value).format('0a');
}

/**
 * Tries to convert strings in various formats to a number
 * Examples:
 *     '10,000.12'  --> 10000.12
 *     '23rd'       --> 23
 *     '$10,000.00' --> 10000
 *     '100B'       --> 100
 *     '3.467TB'    --> 3467000000000
 *     '-76%'       --> -0.76
 * @param value
 */
function stringToNumber(value: string) {
    return numeral(value).value();
}

export const NumberUtils = {
    format,
    formatAsMoney,
    formatWithSign,
    formatWithAbbreviation,
    stringToNumber,
};
