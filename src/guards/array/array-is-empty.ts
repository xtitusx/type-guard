import { ArrayRuleChecker } from './array-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class ArrayIsEmpty extends ArrayRuleChecker<{ type: 'isEmpty' }> {
    constructor(rule: { type: 'isEmpty' }, value: unknown[]) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isEmpty()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`array object is expected to be empty but has length of: ${this.value.length}`)
                  .build();
    }

    private isEmpty(): boolean {
        return this.value.length === 0;
    }
}
