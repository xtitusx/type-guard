import { ArrayRuleChecker } from './array-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class ArrayHasSize extends ArrayRuleChecker<{ type: 'hasSize'; value: number }> {
    constructor(rule: { type: 'hasSize'; value: number }, value: unknown[]) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value.length === this.rule.value
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(
                      `array object is expected to have length of ${this.rule.value} but has length of: ${this.value.length}`
                  )
                  .build();
    }
}
