import { NilRuleChecker } from './nil-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * @class NilIsNotUndefined
 */
export class NilIsNotUndefined extends NilRuleChecker<{ type: 'isNotUndefined' }> {
    constructor(rule: { type: 'isNotUndefined' }, value: unknown) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value !== undefined
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`value is not expected to be undefined but is: ${typeof this.value}`)
                  .build();
    }
}
