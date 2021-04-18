import { NumberRuleChecker } from './number-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class NumberIsNegative extends NumberRuleChecker<{ type: 'isNegative' }> {
    constructor(rule: { type: 'isNegative' }, value: number) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isNegative()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`number is expected to be smaller than zero but is greater: ${this.value}`)
                  .build();
    }

    private isNegative(): boolean {
        return this.value < 0;
    }
}
