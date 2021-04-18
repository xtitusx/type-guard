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
        return this.isUppercase()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to not have any lowercase alpha characters but has: ${this.value}`)
                  .build();
    }

    private isUppercase(): boolean {
        return this.value.toUpperCase() === this.value;
    }
}
