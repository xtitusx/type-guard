import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * @class StringNotEquals
 */
export class StringNotEquals extends StringRuleChecker<{ type: 'notEquals'; value: string }> {
    constructor(rule: { type: 'notEquals'; value: string }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value !== this.rule.value
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is not expected to be ${this.rule.value} but is: ${this.value}`)
                  .build();
    }
}
