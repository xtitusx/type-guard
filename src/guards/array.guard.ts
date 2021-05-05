import { ArrayRule } from './array/array-types';
import { ArrayIsEmpty } from './array/array-is-empty';
import { ArrayIsNotEmpty } from './array/array-is-not-empty';
import { ArrayHasSize } from './array/array-has-size';
import { ArrayHasMinSize } from './array/array-has-min-size';
import { ArrayHasMaxSize } from './array/array-has-max-size';
import { ArrayContains } from './array/array-contains';

import { Guard, IGuardOptions } from '../core/guard';
import { GuardResult } from '../core/guard-result';

export class ArrayGuard extends Guard<ArrayRule> {
    constructor(options?: IGuardOptions) {
        super(options);
    }

    /**
     * Checks if array is empty.
     * @remarks Chainable method.
     */
    public isEmpty(): this {
        this.addRule({ type: 'isEmpty' });
        return this;
    }

    /**
     * Checks if array is not empty.
     * @remarks Chainable method.
     */
    public isNotEmpty(): this {
        this.addRule({ type: 'isNotEmpty' });
        return this;
    }

    /**
     * Checks if array's length is equal to the specified number.
     * @remarks Chainable method.
     * @param value
     */
    public hasSize(value: number): this {
        this.addRule({ type: 'hasSize', value: value });
        return this;
    }

    /**
     * Checks if array's length is equal or greater than to the specified number.
     * @remarks Chainable method.
     * @param min
     */
    public hasMinSize(min: number): this {
        this.addRule({ type: 'hasMinSize', min: min });
        return this;
    }

    /**
     * Checks if array's length is equal or smaller than the specified number.
     * @remarks Chainable method.
     * @param max
     */
    public hasMaxSize(max: number): this {
        this.addRule({ type: 'hasMaxSize', max: max });
        return this;
    }

    /**
     * Checks if array contains the specified value.
     * @remarks Chainable method.
     * @param value
     */
    public contains(value: unknown): this {
        this.addRule({ type: 'contains', value: value });
        return this;
    }

    /**
     * @override
     * @param rule
     * @param value
     */
    protected checkRule(rule: ArrayRule, value: unknown[]): GuardResult {
        switch (rule.type) {
            case 'isEmpty':
                return new ArrayIsEmpty(rule, value).exec();
            case 'isNotEmpty':
                return new ArrayIsNotEmpty(rule, value).exec();
            case 'hasSize':
                return new ArrayHasSize(rule, value).exec();
            case 'hasMinSize':
                return new ArrayHasMinSize(rule, value).exec();
            case 'hasMaxSize':
                return new ArrayHasMaxSize(rule, value).exec();
            case 'contains':
                return new ArrayContains(rule, value).exec();
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
