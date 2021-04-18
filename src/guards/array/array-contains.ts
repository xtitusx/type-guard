import { ArrayRuleChecker } from './array-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class ArrayContains extends ArrayRuleChecker<{ type: 'contains'; value: any }> {
    constructor(rule: { type: 'contains'; value: any }, value: unknown[]) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.contains()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`array object is expected to contain ${this.rule.value} value but is not`)
                  .build();
    }

    private contains(): boolean {
        return Object.values(this.value).includes(this.rule.value);
    }
}
