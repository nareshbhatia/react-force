/**
 * Removes line breaks from the supplied string.
 *
 * Useful when deserializing HTML because the deserialize() function does not
 * handle line breaks well.
 */
export const removeLineBreaks = (str: string) =>
    str.replace(/(\r\n|\n|\r)/gm, '');
