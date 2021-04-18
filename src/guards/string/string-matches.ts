import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class StringMatches extends StringRuleChecker<{ type: 'matches'; value: RegExp }> {
    constructor(rule: { type: 'matches'; value: RegExp }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.matches()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to match ${this.rule.value} regex but does not: ${this.value}`)
                  .build();
    }

    private matches(): boolean {
        return this.value.match(this.rule.value) !== null;
    }
}
