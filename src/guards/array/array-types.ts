export type ArrayRule =
    | { type: 'contains'; value: any }
    | { type: 'hasMaxSize'; max: number }
    | { type: 'hasMinSize'; min: number }
    | { type: 'hasSize'; value: number }
    | { type: 'isEmpty' }
    | { type: 'isNotEmpty' };
