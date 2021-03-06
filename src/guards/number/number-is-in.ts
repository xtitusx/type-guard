import { NumberRuleChecker } from './number-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class NumberIsIn extends NumberRuleChecker<{ type: 'isIn'; values: number[] }> {
    constructor(rule: { type: 'isIn'; values: number[] }, value: number) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isIn()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(
                      `number is expected to be in an array of allowed number values but is not: ${this.value}`
                  )
                  .build();
    }

    private isIn(): boolean {
        return this.rule.values.includes(this.value);
    }
}
