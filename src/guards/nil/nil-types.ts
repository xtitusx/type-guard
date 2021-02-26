export type NilRule =
    | { type: 'isUndefined' }
    | { type: 'isNotUndefined' }
    | { type: 'isNull' }
    | { type: 'isNotNull' }
    | { type: 'isNil' }
    | { type: 'isNotNil' };
