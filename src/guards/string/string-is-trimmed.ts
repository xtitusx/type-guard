import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class StringIsTrimmed extends StringRuleChecker<{ type: 'isTrimmed' }> {
    constructor(rule: { type: 'isTrimmed' }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value.trim() === this.value
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(
                      `string is expected to not contain any leading and trailing whitespace but has: ${this.value}`
                  )
                  .build();
    }
}
