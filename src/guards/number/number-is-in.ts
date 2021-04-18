import { NumberRuleChecker } from './number-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class NumberIsIn extends NumberRuleChecker<{ type: 'isIn'; min: number; max: number }> {
    constructor(rule: { type: 'isIn'; min: number; max: number }, value: number) {
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
                      `number is expected to be within range ${this.rule.min} to ${this.rule.max} but is not: ${this.value}`
                  )
                  .build();
    }

    private isIn(): boolean {
        return this.value >= this.rule.min && this.value <= this.rule.max;
    }
}
