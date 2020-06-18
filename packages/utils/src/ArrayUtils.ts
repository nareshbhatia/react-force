/**
 * Useful Types
 */
export type ArrayOrNone<T> = Array<T> | null | undefined;

/**
 * Compare functions
 * -----------------
 * Functions that compares two array elements as specified by
 * the Array sort function.
 */
export type CompareFunction<T> = (e1: T, e2: T) => number;

function compareNumbers(e1: number, e2: number) {
    return e1 - e2;
}

function compareStrings(e1: string, e2: string) {
    return e1.localeCompare(e2);
}

/**
 * isEqual
 * -------
 * Compares two arrays for equality. By default the order is ignored.
 */
function isEqual<T>(
    a1: Array<T>,
    a2: Array<T>,
    compareFunction: CompareFunction<T>,
    ignoreOrder: boolean = true
): boolean {
    if (a1.length !== a2.length) {
        return false;
    } else {
        // prepare arrays for comparison
        // if ignoreOrder, then we need to copy and sort the arrays
        const arr1 = ignoreOrder ? a1.slice(0).sort(compareFunction) : a1;
        const arr2 = ignoreOrder ? a2.slice(0).sort(compareFunction) : a2;

        // compare
        let result = true;
        const length = arr1.length;
        for (let i = 0; i < length; i++) {
            if (compareFunction(arr1[i], arr2[i]) !== 0) {
                result = false;
                break;
            }
        }
        return result;
    }
}

export const ArrayUtils = {
    compareNumbers,
    compareStrings,
    isEqual,
};
