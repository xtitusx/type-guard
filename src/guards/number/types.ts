export type NumberRule =
    | { type: 'equals'; value: number }
    | { type: 'isMin'; min: number }
    | { type: 'isMax'; max: number }
    | { type: 'isIn'; min: number; max: number }
    | { type: 'isPositive' }
    | { type: 'isNegative' }
    | { type: 'isWhole' }
    | { type: 'isDecimal' }
    | { type: 'isEven' }
    | { type: 'isOdd' }
    | { type: 'isPrime' }
    | { type: 'isComposite' }
    | { type: 'isFibonacci' }
    | { type: 'isNegaFibonacci' }
    | { type: 'isNetworkPort'; range?: NetworkPortRange };

export type NetworkPortRange = 'well-known' | 'registered' | 'private';
