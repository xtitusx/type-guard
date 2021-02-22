import { Guard } from './guard';

import { GuardResult } from '../guard-result';
import { NumberUtils } from '../utils/number-utils';

type NumberRule =
    | { type: 'equals'; value: number }
    | { type: 'isMin'; min: number }
    | { type: 'isMax'; max: number }
    | { type: 'isIn'; min: number; max: number }
    | { type: 'isPositive' }
    | { type: 'isNegative' }
    | { type: 'isWhole' }
    | { type: 'isDecimal' }
    | { type: 'isEven' }
    | { type: 'isOdd' }
    | { type: 'isPrime' }
    | { type: 'isComposite' }
    | { type: 'isFibonacci' }
    | { type: 'isNegaFibonacci' }
    | { type: 'isNetworkPort'; range?: NetworkPortRange };

type NetworkPortRange = 'well-known' | 'registered' | 'private';

/** @class NumberGuard
 * @extends {Guard<NumberRule>}
 */
export class NumberGuard extends Guard<NumberRule> {
    constructor(rules?: NumberRule[]) {
        super(rules);
    }

    /**
     * @summary Chainable method.
     * @description Checks if two numbers are equals.
     * @param value number
     */
    public equals(value: number): this {
        this.addRule({ type: 'equals', value: value });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if number is equal or greater than to the specified number.
     * @param min number
     */
    public isMin(min: number): this {
        this.addRule({ type: 'isMin', min: min });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if number is equal or smaller than to the specified number.
     * @param max number
     */
    public isMax(max: number): this {
        this.addRule({ type: 'isMax', max: max });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if number is within a closed interval.
     * @param min number
     * @param max number
     */
    public isIn(min: number, max: number): this {
        this.addRule({ type: 'isIn', min: min, max: max });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if number is greater than zero.
     */
    public isPositive(): this {
        this.addRule({ type: 'isPositive' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if number is smaller than zero.
     */
    public isNegative(): this {
        this.addRule({ type: 'isNegative' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if number is a whole number.
     */
    public isWhole(): this {
        this.addRule({ type: 'isWhole' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if number is a decimal number.
     */
    public isDecimal(): this {
        this.addRule({ type: 'isDecimal' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if number is even.
     */
    public isEven(): this {
        this.addRule({ type: 'isEven' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if number is odd.
     */
    public isOdd(): this {
        this.addRule({ type: 'isOdd' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if number is a prime number.
     * @see https://en.wikipedia.org/wiki/Prime_number
     */
    public isPrime(): this {
        this.addRule({ type: 'isPrime' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if number is a composite number.
     * @see https://en.wikipedia.org/wiki/Composite_number
     */
    public isComposite(): this {
        this.addRule({ type: 'isComposite' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if number is a Fibonacci number.
     * @see https://en.wikipedia.org/wiki/Fibonacci_number
     */
    public isFibonacci(): this {
        this.addRule({ type: 'isFibonacci' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if number is a NegaFibonacci number.
     * @see https://en.wikipedia.org/wiki/NegaFibonacci_coding
     */
    public isNegaFibonacci(): this {
        this.addRule({ type: 'isNegaFibonacci' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if number is a Network Port.
     * @param range 'well-known' | 'registered' | 'private' (optional).
     */
    public isNetworkPort(range?: NetworkPortRange): this {
        this.addRule({ type: 'isNetworkPort', range });
        return this;
    }

    /**
     * @override
     * @param rule NumberRule
     * @param value number
     */
    protected checkRule(rule: NumberRule, value: number): GuardResult {
        switch (rule.type) {
            case 'equals':
                return value === rule.value
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`number is expected to be ${rule.value} but is not: ${value}`)
                          .build();
            case 'isMin':
                return value >= rule.min
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `number is expected to be equal or greater than ${rule.min} but is smaller: ${value}`
                          )
                          .build();
            case 'isMax':
                return value <= rule.max
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `number is expected to be equal or smaller than ${rule.max} but is greater: ${value}`
                          )
                          .build();
            case 'isIn':
                return value >= rule.min && value <= rule.max
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `number is expected to be within range ${rule.min} to ${rule.max} but is not: ${value}`
                          )
                          .build();
            case 'isPositive':
                return value > 0
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`number is expected to be greater than zero but is smaller: ${value}`)
                          .build();
            case 'isNegative':
                return value < 0
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`number is expected to be smaller than zero but is greater: ${value}`)
                          .build();
            case 'isWhole':
                return Number.isInteger(value)
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`number is expected to be a whole number but is not: ${value}`)
                          .build();
            case 'isDecimal':
                return !Number.isInteger(value)
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`number is expected to be a decimal number but is not: ${value}`)
                          .build();
            case 'isEven':
                return value % 2 === 0
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`number is expected to be even but is not: ${value}`)
                          .build();
            case 'isOdd':
                return Number.isInteger(value) && value % 2 !== 0
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`number is expected to be odd but is not: ${value}`)
                          .build();
            case 'isPrime':
                return NumberUtils.isPrime(value)
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`number is expected to be a prime number but is not: ${value}`)
                          .build();
            case 'isComposite':
                return NumberUtils.isComposite(value)
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`number is expected to be a composite number but is not: ${value}`)
                          .build();
            case 'isFibonacci':
                return NumberUtils.isFibonacci(value)
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`number is expected to be a Fibonacci number but is not: ${value}`)
                          .build();
            case 'isNegaFibonacci':
                return NumberUtils.isNegaFibonacci(value)
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`number is expected to be a NegaFibonacci number but is not: ${value}`)
                          .build();

            case 'isNetworkPort':
                switch (rule.range) {
                    case 'well-known':
                        return Number.isInteger(value) && value >= 1 && value <= 1023
                            ? new GuardResult.Builder().withSuccess(true).build()
                            : new GuardResult.Builder()
                                  .withSuccess(false)
                                  .withMessage(
                                      `number is expected to be a well-known network port (1-1023) but is not: ${value}`
                                  )
                                  .build();
                    case 'registered':
                        return Number.isInteger(value) && value >= 1024 && value <= 49151
                            ? new GuardResult.Builder().withSuccess(true).build()
                            : new GuardResult.Builder()
                                  .withSuccess(false)
                                  .withMessage(
                                      `number is expected to be a registered network port (1024-49151) but is not: ${value}`
                                  )
                                  .build();
                    case 'private':
                        return Number.isInteger(value) && value >= 49152 && value <= 65535
                            ? new GuardResult.Builder().withSuccess(true).build()
                            : new GuardResult.Builder()
                                  .withSuccess(false)
                                  .withMessage(
                                      `number is expected to be a private network port (1024-49151) but is not: ${value}`
                                  )
                                  .build();
                    default:
                        return Number.isInteger(value) && value >= 1 && value <= 65535
                            ? new GuardResult.Builder().withSuccess(true).build()
                            : new GuardResult.Builder()
                                  .withSuccess(false)
                                  .withMessage(
                                      `number is expected to be a private network port (49152-65535) but is not: ${value}`
                                  )
                                  .build();
                }
        }
    }

    /**
     * @override
     */
    protected guardType(): void {
        if (this.propertyValue === null || undefined) {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(
                `${this.constructor.name} expected a number but received: ${this.propertyValue}`
            );
        } else if (typeof this.propertyValue !== 'number') {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(
                `${this.constructor.name} expected a number but received: ${typeof this.propertyValue}`
            );
        }
    }
}
