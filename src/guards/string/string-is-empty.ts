import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class StringIsEmpty extends StringRuleChecker<{ type: 'isEmpty' }> {
    constructor(rule: { type: 'isEmpty' }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value.length === 0
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to be empty but has length of: ${this.value.length}`)
                  .build();
    }
}
