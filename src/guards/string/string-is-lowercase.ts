import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class StringIsLowercase extends StringRuleChecker<{ type: 'isLowerCase' }> {
    constructor(rule: { type: 'isLowerCase' }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isLowercase()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to not have any uppercase alpha characters but has: ${this.value}`)
                  .build();
    }

    private isLowercase(): boolean {
        return this.value.toLowerCase() === this.value;
    }
}
