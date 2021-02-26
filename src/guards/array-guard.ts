import { ArrayRule } from './array/types';
import { IsEmpty } from './array/is-empty';
import { IsNotEmpty } from './array/is-not-empty';
import { HasSize } from './array/has-size';
import { HasMinSize } from './array/has-min-size';
import { HasMaxSize } from './array/has-max-size';
import { Contains } from './array/contains';

import { Guard } from '../core/guard';
import { GuardResult } from '../core/guard-result';

/** @class ArrayGuard
 * @extends {Guard<ArrayRule>}
 */
export class ArrayGuard extends Guard<ArrayRule> {
    constructor(rules?: ArrayRule[]) {
        super(rules);
    }

    /**
     * @summary Chainable method.
     * @description Check if array is empty.
     */
    public isEmpty(): this {
        this.addRule({ type: 'isEmpty' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Check if array is not empty.
     */
    public isNotEmpty(): this {
        this.addRule({ type: 'isNotEmpty' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if array's length is equal to the specified number.
     * @param value number
     */
    public hasSize(value: number): this {
        this.addRule({ type: 'hasSize', value: value });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if array's length is equal or greater than to the specified number.
     * @param min number
     */
    public hasMinSize(min: number): this {
        this.addRule({ type: 'hasMinSize', min: min });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if array's length is equal or smaller than the specified number.
     * @param max number
     */
    public hasMaxSize(max: number): this {
        this.addRule({ type: 'hasMaxSize', max: max });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if array contains the specified number.
     * @param value unknown
     */
    public contains(value: unknown): this {
        this.addRule({ type: 'contains', value: value });
        return this;
    }

    /**
     * @override
     * @param rule ArrayRule
     * @param value unknown[]
     */
    protected checkRule(rule: ArrayRule, value: unknown[]): GuardResult {
        switch (rule.type) {
            case 'isEmpty':
                return new IsEmpty(rule, value).exec();
            case 'isNotEmpty':
                return new IsNotEmpty(rule, value).exec();
            case 'hasSize':
                return new HasSize(rule, value).exec();
            case 'hasMinSize':
                return new HasMinSize(rule, value).exec();
            case 'hasMaxSize':
                return new HasMaxSize(rule, value).exec();
            case 'contains':
                return new Contains(rule, value).exec();
        }
    }

    /**
     * @override
     */
    protected typeGuard(): void {
        if (this.propertyValue === undefined || this.propertyValue === null) {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(
                `${this.constructor.name} expected an array object but received: ${this.propertyValue}`
            );
        } else if (!Array.isArray(this.propertyValue)) {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(
                `${this.constructor.name} expected an array object but received: ${typeof this.propertyValue}`
            );
        }
    }
}
