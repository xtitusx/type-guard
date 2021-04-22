export type DateStringRule =
    | { type: 'isIso8601Date' }
    | { type: 'isRfc3339' }
    | { type: 'isSame'; value: string }
    | { type: 'isSameOrBefore'; value: string }
    | { type: 'isSameOrAfter'; value: string }
    | { type: 'isBefore'; value: string }
    | { type: 'isAfter'; value: string };
