import { NumberRule, NetworkPortRange } from './number/number-types';
import { NumberEquals } from './number/number-equals';
import { NumberIsIn } from './number/number-is-in';
import { NumberIsMax } from './number/number-is-max';
import { NumberIsMin } from './number/number-is-min';
import { NumberIsPositive } from './number/number-is-positive';
import { NumberIsNegative } from './number/number-is-negative';
import { NumberIsWhole } from './number/number-is-whole';
import { NumberIsDecimal } from './number/number-is-decimal';
import { NumberIsEven } from './number/number-is-even';
import { NumberIsOdd } from './number/number-is-odd';
import { NumberIsPrime } from './number/number-is-prime';
import { NumberIsComposite } from './number/number-is-composite';
import { NumberIsFibonacci } from './number/number-is-fibonacci';
import { NumberIsNegaFibonacci } from './number/number-is-nega-fibonacci';
import { NumberIsNetworkPort } from './number/number-is-network-port';

import { Guard } from '../core/guard';
import { GuardResult } from '../core/guard-result';

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
                return new NumberEquals(rule, value).exec();
            case 'isMin':
                return new NumberIsMin(rule, value).exec();
            case 'isMax':
                return new NumberIsMax(rule, value).exec();
            case 'isIn':
                return new NumberIsIn(rule, value).exec();
            case 'isPositive':
                return new NumberIsPositive(rule, value).exec();
            case 'isNegative':
                return new NumberIsNegative(rule, value).exec();
            case 'isWhole':
                return new NumberIsWhole(rule, value).exec();
            case 'isDecimal':
                return new NumberIsDecimal(rule, value).exec();
            case 'isEven':
                return new NumberIsEven(rule, value).exec();
            case 'isOdd':
                return new NumberIsOdd(rule, value).exec();
            case 'isPrime':
                return new NumberIsPrime(rule, value).exec();
            case 'isComposite':
                return new NumberIsComposite(rule, value).exec();
            case 'isFibonacci':
                return new NumberIsFibonacci(rule, value).exec();
            case 'isNegaFibonacci':
                return new NumberIsNegaFibonacci(rule, value).exec();
            case 'isNetworkPort':
                return new NumberIsNetworkPort(rule, value).exec();
        }
    }

    /**
     * @override
     */
    protected typeGuard(): void {
        if (this.propertyValue === undefined || this.propertyValue === null) {
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
