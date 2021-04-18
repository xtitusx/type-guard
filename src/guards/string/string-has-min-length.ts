import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class StringHasMinLength extends StringRuleChecker<{ type: 'hasMinLength'; min: number }> {
    constructor(rule: { type: 'hasMinLength'; min: number }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.hasMinLength()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(
                      `string is expected to have min length of ${this.rule.min} but has length of: ${this.value.length}`
                  )
                  .build();
    }

    private hasMinLength(): boolean {
        return this.value.length >= this.rule.min;
    }
}
