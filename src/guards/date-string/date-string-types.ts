export type DateStringRule =
    | { type: 'isAfter'; value: string }
    | { type: 'isBefore'; value: string }
    | { type: 'isIso8601Date' }
    | { type: 'isRfc3339' }
    | { type: 'isSame'; value: string }
    | { type: 'isSameOrAfter'; value: string }
    | { type: 'isSameOrBefore'; value: string };
