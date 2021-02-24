import { Guard } from '../core/guard';
import { GuardResult } from '../core/guard-result';

type ArrayRule =
    | { type: 'isEmpty' }
    | { type: 'isNotEmpty' }
    | { type: 'hasSize'; value: number }
    | { type: 'hasMinSize'; min: number }
    | { type: 'hasMaxSize'; max: number }
    | { type: 'contains'; value: any };

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
                return value.length === 0
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`array object is expected to be empty but has length of: ${value.length}`)
                          .build();
            case 'isNotEmpty':
                return value.length !== 0
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`array object is expected to not be empty but has length of: ${value.length}`)
                          .build();
            case 'hasSize':
                return value.length === rule.value
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `array object is expected to have length of ${rule.value} but has length of: ${value.length}`
                          )
                          .build();
            case 'hasMinSize':
                return value.length >= rule.min
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `array object is expected to have min length of ${rule.min} but has length of: ${value.length}`
                          )
                          .build();
            case 'hasMaxSize':
                return value.length <= rule.max
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `array object is expected to have max length of ${rule.max} but has length of: ${value.length}`
                          )
                          .build();
            case 'contains':
                return Object.values(value).includes(rule.value)
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`array object is expected to contain ${rule.value} value but is not`)
                          .build();
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
