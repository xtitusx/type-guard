import { NumberRuleChecker } from './number-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class NumberIsNotIn extends NumberRuleChecker<{ type: 'isNotIn'; values: number[] }> {
    constructor(rule: { type: 'isNotIn'; values: number[] }, value: number) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isNotIn()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(
                      `number is expected to not be in an array of disallowed number values but is: ${this.value}`
                  )
                  .build();
    }

    private isNotIn(): boolean {
        return !this.rule.values.includes(this.value);
    }
}
