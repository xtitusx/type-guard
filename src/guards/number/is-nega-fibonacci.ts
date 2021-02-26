import { NumberRuleChecker } from './number-rule-checker';

import { GuardResult } from '../../core/guard-result';
import { NumberUtils } from '../../utils/number-utils';

/**
 * @class IsNegaFibonacci
 */
export class IsNegaFibonacci extends NumberRuleChecker<{ type: 'isNegaFibonacci' }> {
    constructor(rule: { type: 'isNegaFibonacci' }, value: number) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return NumberUtils.isNegaFibonacci(this.value)
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`number is expected to be a NegaFibonacci number but is not: ${this.value}`)
                  .build();
    }
}
