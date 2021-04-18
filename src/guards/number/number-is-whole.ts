import { NumberRuleChecker } from './number-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class NumberIsWhole extends NumberRuleChecker<{ type: 'isWhole' }> {
    constructor(rule: { type: 'isWhole' }, value: number) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isWhole()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`number is expected to be a whole number but is not: ${this.value}`)
                  .build();
    }

    private isWhole(): boolean {
        return Number.isInteger(this.value);
    }
}
