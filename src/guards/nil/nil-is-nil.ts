import { NilRuleChecker } from './nil-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * @class NilIsNil
 */
export class NilIsNil extends NilRuleChecker<{ type: 'isNil' }> {
    constructor(rule: { type: 'isNil' }, value: unknown) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value === undefined || this.value === null
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`value is expected to be undefined or null but is not: ${typeof this.value}`)
                  .build();
    }
}
