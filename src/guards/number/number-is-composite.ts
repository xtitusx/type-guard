import { NumberRuleChecker } from './number-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class NumberIsComposite extends NumberRuleChecker<{ type: 'isComposite' }> {
    constructor(rule: { type: 'isComposite' }, value: number) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isComposite()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`number is expected to be a composite number but is not: ${this.value}`)
                  .build();
    }

    /**
     * Checks if number is a composite number.
     * @remarks A composite number is a positive integer that can be formed by multiplying two smaller positive integers.
     */
    private isComposite(): boolean {
        if (!Number.isInteger(this.value) || this.value < 4) {
            return false;
        }
        for (let whole = 2; whole < this.value; whole++) {
            if (this.value % whole === 0) {
                return true;
            }
        }

        return false;
    }
}
