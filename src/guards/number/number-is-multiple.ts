import { NumberRuleChecker } from './number-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class NumberIsMultiple extends NumberRuleChecker<{ type: 'isMultiple'; value: number }> {
    constructor(rule: { type: 'isMultiple'; value: number }, value: number) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isMultiple()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`number is expected to be a multiple of ${this.rule.value} but is not: ${this.value}`)
                  .build();
    }

    private isMultiple(): boolean {
        return this.rule.value === 0 || this.value % this.rule.value === 0;
    }
}
