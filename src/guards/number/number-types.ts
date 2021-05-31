export type NumberRule =
    | { type: 'equals'; value: number }
    | { type: 'hasMaxFractionDigits'; max: number }
    | { type: 'isComposite' }
    | { type: 'isEven' }
    | { type: 'isFibonacci'; allowNegative?: boolean }
    | { type: 'isIn'; min: number; max: number }
    | { type: 'isMax'; max: number }
    | { type: 'isMin'; min: number }
    | { type: 'isMultiple'; value: number }
    | { type: 'isNegative' }
    | { type: 'isNetworkPort'; range?: NetworkPortRange }
    | { type: 'isOdd' }
    | { type: 'isPositive' }
    | { type: 'isPrime' }
    | { type: 'isWhole' };

export type NetworkPortRange = 'well-known' | 'registered' | 'private';
