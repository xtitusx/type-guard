export type NilRule =
    | { type: 'isNil' }
    | { type: 'isNotNil' }
    | { type: 'isNotNull' }
    | { type: 'isNotUndefined' }
    | { type: 'isNull' }
    | { type: 'isUndefined' };
