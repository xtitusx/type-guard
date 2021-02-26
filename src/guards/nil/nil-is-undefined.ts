import { NilRuleChecker } from './nil-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * @class NilIsUndefined
 */
export class NilIsUndefined extends NilRuleChecker<{ type: 'isUndefined' }> {
    constructor(rule: { type: 'isUndefined' }, value: unknown) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value === undefined
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`value is expected to be undefined but is not: ${typeof this.value}`)
                  .build();
    }
}
