import { NumberRuleChecker } from './number-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class NumberIsMin extends NumberRuleChecker<{ type: 'isMin'; min: number }> {
    constructor(rule: { type: 'isMin'; min: number }, value: number) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value >= this.rule.min
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(
                      `number is expected to be equal or greater than ${this.rule.min} but is smaller: ${this.value}`
                  )
                  .build();
    }
}
