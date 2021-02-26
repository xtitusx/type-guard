import { NumberRuleChecker } from './number-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * @class IsPositive
 */
export class IsPositive extends NumberRuleChecker<{ type: 'isPositive' }> {
    constructor(rule: { type: 'isPositive' }, value: number) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value > 0
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`number is expected to be greater than zero but is smaller: ${this.value}`)
                  .build();
    }
}
