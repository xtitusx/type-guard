import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class StringIsNotIn extends StringRuleChecker<{ type: 'isNotIn'; values: string[] }> {
    constructor(rule: { type: 'isNotIn'; values: string[] }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isNotIn()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(
                      `string is expected to not be in an array of disallowed string values but is: ${this.value}`
                  )
                  .build();
    }

    private isNotIn(): boolean {
        return !this.rule.values.includes(this.value);
    }
}
