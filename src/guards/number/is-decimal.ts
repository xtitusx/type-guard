import { NumberRuleChecker } from './number-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * @class IsDecimal
 */
export class IsDecimal extends NumberRuleChecker<{ type: 'isDecimal' }> {
    constructor(rule: { type: 'isDecimal' }, value: number) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return !Number.isInteger(this.value)
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`number is expected to be a decimal number but is not: ${this.value}`)
                  .build();
    }
}
