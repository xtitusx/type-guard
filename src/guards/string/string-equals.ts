import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * @class StringEquals
 */
export class StringEquals extends StringRuleChecker<{ type: 'equals'; value: string }> {
    constructor(rule: { type: 'equals'; value: string }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value === this.rule.value
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to be ${this.rule.value} but is not: ${this.value}`)
                  .build();
    }
}
