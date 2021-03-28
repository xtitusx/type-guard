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
        return this.isPrime(this.value)
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`number is expected to be a prime number but is not: ${this.value}`)
                  .build();
    }

    /**
     * Checks if number is a prime number.
     * @remarks A prime number is a positive integer that is not a product of two smaller natural numbers.
     * @param value
     */
    private isPrime(value: number): boolean {
        if (!Number.isInteger(value) || value < 2) {
            return false;
        }
        for (let whole = 2; whole < value; whole++) {
            if (value % whole === 0) {
                return false;
            }
        }

        return true;
    }
}
