import { NilRuleChecker } from './nil-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * @class NilIsNotNil
 */
export class NilIsNotNil extends NilRuleChecker<{ type: 'isNotNil' }> {
    constructor(rule: { type: 'isNotNil' }, value: unknown) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isNotNil()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`value is not expected to be undefined or null but is: ${typeof this.value}`)
                  .build();
    }

    private isNotNil(): boolean {
        return this.value !== undefined && this.value !== null;
    }
}
