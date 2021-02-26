export type ArrayRule =
    | { type: 'isEmpty' }
    | { type: 'isNotEmpty' }
    | { type: 'hasSize'; value: number }
    | { type: 'hasMinSize'; min: number }
    | { type: 'hasMaxSize'; max: number }
    | { type: 'contains'; value: any };
