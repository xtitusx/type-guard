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
        return this.isComposite(this.value)
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`number is expected to be a composite number but is not: ${this.value}`)
                  .build();
    }

    /**
     * Checks if number is a composite number.
     * @remarks A composite number is a positive integer that can be formed by multiplying two smaller positive integers.
     * @param value
     */
    private isComposite(value: number): boolean {
        if (!Number.isInteger(value) || value < 4) {
            return false;
        }
        for (let whole = 2; whole < value; whole++) {
            if (value % whole === 0) {
                return true;
            }
        }

        return false;
    }
}
