import { NumberRuleChecker } from './number-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class NumberIsPositive extends NumberRuleChecker<{ type: 'isPositive' }> {
    constructor(rule: { type: 'isPositive' }, value: number) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isPositive()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`number is expected to be greater than zero but is smaller: ${this.value}`)
                  .build();
    }

    private isPositive(): boolean {
        return this.value > 0;
    }
}
