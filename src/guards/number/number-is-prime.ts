import { NumberRuleChecker } from './number-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class NumberIsPrime extends NumberRuleChecker<{ type: 'isPrime' }> {
    constructor(rule: { type: 'isPrime' }, value: number) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isPrime()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`number is expected to be a prime number but is not: ${this.value}`)
                  .build();
    }

    /**
     * Checks if number is a prime number.
     * @remarks A prime number is a positive integer that is not a product of two smaller natural numbers.
     */
    private isPrime(): boolean {
        if (!Number.isInteger(this.value) || this.value < 2) {
            return false;
        }
        for (let whole = 2; whole < this.value; whole++) {
            if (this.value % whole === 0) {
                return false;
            }
        }

        return true;
    }
}
