import { ArrayRuleChecker } from './array-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * @class ArrayHasMaxSize
 */
export class ArrayHasMaxSize extends ArrayRuleChecker<{ type: 'hasMaxSize'; max: number }> {
    constructor(rule: { type: 'hasMaxSize'; max: number }, value: unknown[]) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value.length <= this.rule.max
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(
                      `array object is expected to have max length of ${this.rule.max} but has length of: ${this.value.length}`
                  )
                  .build();
    }
}
