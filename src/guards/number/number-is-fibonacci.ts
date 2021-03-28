import { NumberRuleChecker } from './number-rule-checker';

import { GuardResult } from '../../core/guard-result';

export class NumberIsFibonacci extends NumberRuleChecker<{ type: 'isFibonacci'; allowNegative?: boolean }> {
    constructor(rule: { type: 'isFibonacci'; allowNegative?: boolean }, value: number) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        if (this.rule.allowNegative === true) {
            return this.isNegaFibonacci(this.value)
                ? new GuardResult.Builder().withSuccess(true).build()
                : new GuardResult.Builder()
                      .withSuccess(false)
                      .withMessage(`number is expected to be a NegaFibonacci number but is not: ${this.value}`)
                      .build();
        }

        return this.isFibonacci(this.value)
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`number is expected to be a Fibonacci number but is not: ${this.value}`)
                  .build();
    }

    /**
     * Checks if number is a Fibonacci number.
     * @remarks n is a Fibonacci number if n is equal or greater than zero, and of the following conditions is fulfilled:
     * - 5n²+4 is a perfect square.
     * - 5n²-4 is a perfect square.
     * @param value
     */
    private isFibonacci(value: number): boolean {
        return value < 0
            ? false
            : this.isPerfectSquare(5 * Math.pow(value, 2) + 4) || this.isPerfectSquare(5 * Math.pow(value, 2) - 4);
    }

    /**
     * Checks if number is a NegaFibonacci number.
     * @remarks n is a NegaFibonacci number if one of the following conditions is fulfilled:
     * - 5n²+4 is a perfect square.
     * - 5n²-4 is a perfect square.
     * @param value
     */
    private isNegaFibonacci(value: number): boolean {
        return this.isPerfectSquare(5 * Math.pow(value, 2) + 4) || this.isPerfectSquare(5 * Math.pow(value, 2) - 4);
    }

    /**
     * Checks if number is a perfect square.
     * @remarks Perfect squares are the squares of the whole numbers: 1, 4, 9, 16, 25, 36, 49...
     */
    private isPerfectSquare(value: number): boolean {
        const sq = Math.sqrt(value);

        return sq - Math.floor(sq) === 0;
    }
}
