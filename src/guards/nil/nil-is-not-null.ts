import { NilRuleChecker } from './nil-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * @class NilIsNotNull
 */
export class NilIsNotNull extends NilRuleChecker<{ type: 'isNotNull' }> {
    constructor(rule: { type: 'isNotNull' }, value: unknown) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value !== null
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`value is not expected to be null but is: ${typeof this.value}`)
                  .build();
    }
}
