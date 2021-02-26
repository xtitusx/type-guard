import { NumberRuleChecker } from './number-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * @class IsOdd
 */
export class IsOdd extends NumberRuleChecker<{ type: 'isOdd' }> {
    constructor(rule: { type: 'isOdd' }, value: number) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return Number.isInteger(this.value) && this.value % 2 !== 0
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`number is expected to be odd but is not: ${this.value}`)
                  .build();
    }
}
