import { ArrayRuleChecker } from './array-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * @class Contains
 */
export class Contains extends ArrayRuleChecker<{ type: 'contains'; value: any }> {
    constructor(rule: { type: 'contains'; value: any }, value: unknown[]) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return Object.values(this.value).includes(this.rule.value)
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`array object is expected to contain ${this.rule.value} value but is not`)
                  .build();
    }
}