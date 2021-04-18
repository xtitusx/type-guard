import { NumberRuleChecker } from './number-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class NumberEquals extends NumberRuleChecker<{ type: 'equals'; value: number }> {
    constructor(rule: { type: 'equals'; value: number }, value: number) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.equals()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`number is expected to be equal to ${this.rule.value} but is not: ${this.value}`)
                  .build();
    }

    private equals(): boolean {
        return this.value === this.rule.value;
    }
}
