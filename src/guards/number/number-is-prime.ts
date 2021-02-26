import { NumberRuleChecker } from './number-rule-checker';

import { GuardResult } from '../../core/guard-result';
import { NumberUtils } from '../../utils/number-utils';

/**
 * @class NumberIsPrime
 */
export class NumberIsPrime extends NumberRuleChecker<{ type: 'isPrime' }> {
    constructor(rule: { type: 'isPrime' }, value: number) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return NumberUtils.isPrime(this.value)
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`number is expected to be a prime number but is not: ${this.value}`)
                  .build();
    }
}
