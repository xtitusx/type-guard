import { ArrayRuleChecker } from './array-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * @class ArrayIsNotEmpty
 */
export class ArrayIsNotEmpty extends ArrayRuleChecker<{ type: 'isNotEmpty' }> {
    constructor(rule: { type: 'isNotEmpty' }, value: unknown[]) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value.length !== 0
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`array object is expected to not be empty but has length of: ${this.value.length}`)
                  .build();
    }
}
