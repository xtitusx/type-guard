export type DateStringRule =
    | { type: 'isSame'; value: string }
    | { type: 'isSameOrBefore'; value: string }
    | { type: 'isSameOrAfter'; value: string }
    | { type: 'isBefore'; value: string }
    | { type: 'isAfter'; value: string };
