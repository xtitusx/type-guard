import { NumberRule, NetworkPortRange } from './number/number-types';

import { NumberEquals } from './number/number-equals';
import { NumberIsIn } from './number/number-is-in';
import { NumberIsMax } from './number/number-is-max';
import { NumberIsMin } from './number/number-is-min';
import { NumberIsPositive } from './number/number-is-positive';
import { NumberIsNegative } from './number/number-is-negative';
import { NumberIsWhole } from './number/number-is-whole';
import { NumberHasMaxFractionDigits } from './number/number-has-max-fraction-digits';
import { NumberIsEven } from './number/number-is-even';
import { NumberIsOdd } from './number/number-is-odd';
import { NumberIsMultiple } from './number/number-is-multiple';
import { NumberIsPrime } from './number/number-is-prime';
import { NumberIsComposite } from './number/number-is-composite';
import { NumberIsFibonacci } from './number/number-is-fibonacci';
import { NumberIsNetworkPort } from './number/number-is-network-port';

import { Guard } from '../core/guard';
import { GuardResult } from '../core/guard-result';

export class NumberGuard extends Guard<NumberRule> {
    constructor(rules?: NumberRule[]) {
        super(rules);
    }

    /**
     * Checks if two numbers are equals.
     * @remarks Chainable method.
     * @param value
     */
    public equals(value: number): this {
        this.addRule({ type: 'equals', value: value });
        return this;
    }

    /**
     * Checks if number is equal or greater than to the specified number.
     * @remarks Chainable method.
     * @param min
     */
    public isMin(min: number): this {
        this.addRule({ type: 'isMin', min: min });
        return this;
    }

    /**
     * Checks if number is equal or smaller than to the specified number.
     * @remarks Chainable method.
     * @param max
     */
    public isMax(max: number): this {
        this.addRule({ type: 'isMax', max: max });
        return this;
    }

    /**
     * Checks if number is within a closed interval.
     * @remarks Chainable method.
     * @param min
     * @param max
     */
    public isIn(min: number, max: number): this {
        this.addRule({ type: 'isIn', min: min, max: max });
        return this;
    }

    /**
     * Checks if number is greater than zero.
     * @remarks Chainable method.
     */
    public isPositive(): this {
        this.addRule({ type: 'isPositive' });
        return this;
    }

    /**
     * Checks if number is smaller than zero.
     * @remarks Chainable method.
     */
    public isNegative(): this {
        this.addRule({ type: 'isNegative' });
        return this;
    }

    /**
     * Checks if number is a whole number.
     * @remarks Chainable method.
     */
    public isWhole(): this {
        this.addRule({ type: 'isWhole' });
        return this;
    }

    /**
     * Checks if the fractional part of number is equal or smaller than the specified number.
     * @remarks Chainable method.
     * @param max Max number of digits to the right of the decimal point in the number.
     */
    public hasMaxFractionDigits(max: number): this {
        this.addRule({ type: 'hasMaxFractionDigits', max });
        return this;
    }

    /**
     * Checks if number is even.
     * @remarks Chainable method.
     */
    public isEven(): this {
        this.addRule({ type: 'isEven' });
        return this;
    }

    /**
     * Checks if number is odd.
     * @remarks Chainable method.
     */
    public isOdd(): this {
        this.addRule({ type: 'isOdd' });
        return this;
    }

    /**
     * Checks if number is a multiple of the specified number.
     * @remarks Chainable method.
     * @param value
     */
    public isMultiple(value: number): this {
        this.addRule({ type: 'isMultiple', value });
        return this;
    }

    /**
     * Checks if number is a prime number.
     * @remarks Chainable method.
     * @see {@link https://en.wikipedia.org/wiki/Prime_number }
     */
    public isPrime(): this {
        this.addRule({ type: 'isPrime' });
        return this;
    }

    /**
     * Checks if number is a composite number.
     * @remarks Chainable method.
     * @see {@link https://en.wikipedia.org/wiki/Composite_number }
     */
    public isComposite(): this {
        this.addRule({ type: 'isComposite' });
        return this;
    }

    /**
     * Checks if number is a Fibonacci or a NegaFibonacci number.
     * @remarks Chainable method.
     * @param allowNegative - Allows both positive and negative integers to be represented. Default is false.
     * @see {@link https://en.wikipedia.org/wiki/Fibonacci_number }
     * @see {@link https://en.wikipedia.org/wiki/NegaFibonacci_coding }
     */
    public isFibonacci(allowNegative?: boolean): this {
        this.addRule({ type: 'isFibonacci', allowNegative });
        return this;
    }

    /**
     * Checks if number is a Network Port.
     * @remarks Chainable method.
     * @param range - 'well-known' | 'registered' | 'private'
     */
    public isNetworkPort(range?: NetworkPortRange): this {
        this.addRule({ type: 'isNetworkPort', range });
        return this;
    }

    /**
     * @override
     * @param rule
     * @param value
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
            case 'hasMaxFractionDigits':
                return new NumberHasMaxFractionDigits(rule, value).exec();
            case 'isEven':
                return new NumberIsEven(rule, value).exec();
            case 'isOdd':
                return new NumberIsOdd(rule, value).exec();
            case 'isMultiple':
                return new NumberIsMultiple(rule, value).exec();
            case 'isPrime':
                return new NumberIsPrime(rule, value).exec();
            case 'isComposite':
                return new NumberIsComposite(rule, value).exec();
            case 'isFibonacci':
                return new NumberIsFibonacci(rule, value).exec();
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
