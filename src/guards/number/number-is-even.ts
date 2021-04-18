import { NumberRuleChecker } from './number-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class NumberIsEven extends NumberRuleChecker<{ type: 'isEven' }> {
    constructor(rule: { type: 'isEven' }, value: number) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isEven()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`number is expected to be even but is not: ${this.value}`)
                  .build();
    }

    private isEven(): boolean {
        return this.value % 2 === 0;
    }
}
