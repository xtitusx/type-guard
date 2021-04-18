import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class StringNotContains extends StringRuleChecker<{ type: 'notContains'; value: string }> {
    constructor(rule: { type: 'notContains'; value: string }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.notContains()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is not expected to contain ${this.rule.value} but does: ${this.value}`)
                  .build();
    }

    private notContains(): boolean {
        return this.value.indexOf(this.rule.value) === -1;
    }
}
