import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * @class StringNotContains
 */
export class StringNotContains extends StringRuleChecker<{ type: 'notContains'; value: string }> {
    constructor(rule: { type: 'notContains'; value: string }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value.indexOf(this.rule.value) === -1
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is not expected to contain ${this.rule.value} but does: ${this.value}`)
                  .build();
    }
}
