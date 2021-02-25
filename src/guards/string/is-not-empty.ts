import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * @class IsNotEmpty
 */
export class IsNotEmpty extends StringRuleChecker<{ type: 'isNotEmpty' }> {
    constructor(rule: { type: 'isNotEmpty' }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value.length !== 0
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to not be empty but has length of: ${this.value.length}`)
                  .build();
    }
}
