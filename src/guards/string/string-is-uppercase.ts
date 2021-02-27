import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class StringIsUppercase extends StringRuleChecker<{ type: 'isUpperCase' }> {
    constructor(rule: { type: 'isUpperCase' }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value.toUpperCase() === this.value
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to not have lowercase alpha characters but has: ${this.value}`)
                  .build();
    }
}
