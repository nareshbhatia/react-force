import * as Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

/**
 * returns true if two date ranges are overlapping, false otherwise
 */
function isOverlapping(
    beg1: Date,
    end1: Date,
    beg2: Date,
    end2: Date
): boolean {
    const range1 = moment.range(beg1, end1);
    const range2 = moment.range(beg2, end2);
    return range1.overlaps(range2);
}

export const DateRangeUtils = {
    isOverlapping,
};
