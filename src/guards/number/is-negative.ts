import { NumberRuleChecker } from './number-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * @class IsNegative
 */
export class IsNegative extends NumberRuleChecker<{ type: 'isNegative' }> {
    constructor(rule: { type: 'isNegative' }, value: number) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value < 0
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`number is expected to be smaller than zero but is greater: ${this.value}`)
                  .build();
    }
}
