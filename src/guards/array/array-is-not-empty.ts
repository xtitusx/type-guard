import { ArrayRuleChecker } from './array-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class ArrayIsNotEmpty extends ArrayRuleChecker<{ type: 'isNotEmpty' }> {
    constructor(rule: { type: 'isNotEmpty' }, value: unknown[]) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isNotEmpty()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`array object is expected to not be empty but has length of: ${this.value.length}`)
                  .build();
    }

    private isNotEmpty(): boolean {
        return this.value.length !== 0;
    }
}
