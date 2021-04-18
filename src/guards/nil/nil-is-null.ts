import { NilRuleChecker } from './nil-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * @class NilIsNull
 */
export class NilIsNull extends NilRuleChecker<{ type: 'isNull' }> {
    constructor(rule: { type: 'isNull' }, value: unknown) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value === null
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`value is expected to be null but is not: ${typeof this.value}`)
                  .build();
    }

    private isNull(): boolean {
        return this.value === null;
    }
}
