import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class StringIsIn extends StringRuleChecker<{ type: 'isIn'; value: string[] }> {
    constructor(rule: { type: 'isIn'; value: string[] }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isIn()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(
                      `string is expected to be in an array of allowed string values but is not: ${this.value}`
                  )
                  .build();
    }

    private isIn(): boolean {
        return this.rule.value.includes(this.value);
    }
}
