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
        return this.value.toLowerCase() === this.value
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to not have uppercase alpha characters but has: ${this.value}`)
                  .build();
    }
}
