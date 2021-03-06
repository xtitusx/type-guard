import { NumberRuleChecker } from './number-rule-checker';

import { GuardResult } from '../../core/guard-result';
import { NumberUtils } from '../../utils/number-utils';

export class NumberIsFibonacci extends NumberRuleChecker<{ type: 'isFibonacci'; allowNegative?: boolean }> {
    constructor(rule: { type: 'isFibonacci'; allowNegative?: boolean }, value: number) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        if (this.rule.allowNegative === true) {
            return NumberUtils.isNegaFibonacci(this.value)
                ? new GuardResult.Builder().withSuccess(true).build()
                : new GuardResult.Builder()
                      .withSuccess(false)
                      .withMessage(`number is expected to be a NegaFibonacci number but is not: ${this.value}`)
                      .build();
        }

        return NumberUtils.isFibonacci(this.value)
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`number is expected to be a Fibonacci number but is not: ${this.value}`)
                  .build();
    }
}
