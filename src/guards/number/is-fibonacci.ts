import { NumberRuleChecker } from './number-rule-checker';

import { GuardResult } from '../../core/guard-result';
import { NumberUtils } from '../../utils/number-utils';

/**
 * @class IsFibonacci
 */
export class IsFibonacci extends NumberRuleChecker<{ type: 'isFibonacci' }> {
    constructor(rule: { type: 'isFibonacci' }, value: number) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return NumberUtils.isFibonacci(this.value)
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`number is expected to be a Fibonacci number but is not: ${this.value}`)
                  .build();
    }
}
