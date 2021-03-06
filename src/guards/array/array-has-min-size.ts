import { ArrayRuleChecker } from './array-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class ArrayHasMinSize extends ArrayRuleChecker<{ type: 'hasMinSize'; min: number }> {
    constructor(rule: { type: 'hasMinSize'; min: number }, value: unknown[]) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.hasMinSize()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(
                      `array object is expected to have min length of ${this.rule.min} but has length of: ${this.value.length}`
                  )
                  .build();
    }

    private hasMinSize(): boolean {
        return this.value.length >= this.rule.min;
    }
}
