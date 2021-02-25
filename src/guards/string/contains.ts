import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * @class Contains
 */
export class Contains extends StringRuleChecker<{ type: 'contains'; value: string }> {
    constructor(rule: { type: 'contains'; value: string }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value.indexOf(this.rule.value) !== -1
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to contain ${this.rule.value} but does not: ${this.value}`)
                  .build();
    }
}
