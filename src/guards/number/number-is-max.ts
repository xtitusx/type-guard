import { NumberRuleChecker } from './number-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class NumberIsMax extends NumberRuleChecker<{ type: 'isMax'; max: number }> {
    constructor(rule: { type: 'isMax'; max: number }, value: number) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isMax()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(
                      `number is expected to be equal or smaller than ${this.rule.max} but is greater: ${this.value}`
                  )
                  .build();
    }

    private isMax(): boolean {
        return this.value <= this.rule.max;
    }
}
