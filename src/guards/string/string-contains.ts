import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class StringContains extends StringRuleChecker<{ type: 'contains'; value: string }> {
    constructor(rule: { type: 'contains'; value: string }, value: string) {
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
                  .withMessage(`string is expected to contain ${this.rule.value} but does not: ${this.value}`)
                  .build();
    }

    private contains(): boolean {
        return this.value.indexOf(this.rule.value) !== -1;
    }
}
