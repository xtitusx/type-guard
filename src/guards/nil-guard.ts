import { Guard } from './guard';

import { GuardResult } from '../guard-result';

type NilRule =
    | { type: 'isUndefined' }
    | { type: 'isNotUndefined' }
    | { type: 'isNull' }
    | { type: 'isNotNull' }
    | { type: 'isNil' }
    | { type: 'isNotNil' };

/** @class NilGuard
 * @extends {Guard<NilRule>}
 */
export class NilGuard extends Guard<NilRule> {
    constructor(rules?: NilRule[]) {
        super(rules);
    }

    /**
     * @summary Chainable method.
     * @description Checks if value is undefined.
     */
    public isUndefined(): this {
        this.addRule({ type: 'isUndefined' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if value is not undefined.
     */
    public isNotUndefined(): this {
        this.addRule({ type: 'isNotUndefined' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if value is null.
     */
    public isNull(): this {
        this.addRule({ type: 'isNull' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if value is not null.
     */
    public isNotNull(): this {
        this.addRule({ type: 'isNotNull' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if value is undefined or null.
     */
    public isNil(): this {
        this.addRule({ type: 'isNil' });
        return this;
    }

    /**
     * @summary Chainable method.
     * @description Checks if value is neither undefined nor null.
     */
    public isNotNil(): this {
        this.addRule({ type: 'isNotNil' });
        return this;
    }

    /**
     * @override
     * @param rule NilRule
     * @param value unknown
     */
    protected checkRule(rule: NilRule, value: unknown): GuardResult {
        switch (rule.type) {
            case 'isUndefined':
                return value === undefined
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`value is expected to be undefined but is not: ${typeof value}`)
                          .build();
            case 'isNotUndefined':
                return value !== undefined
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`value is not expected to be undefined but is: ${typeof value}`)
                          .build();
            case 'isNull':
                return value === null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`value is expected to be null but is not: ${typeof value}`)
                          .build();
            case 'isNotNull':
                return value !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`value is not expected to be null but is: ${typeof value}`)
                          .build();
            case 'isNil':
                return value === undefined || value === null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`value is expected to be undefined or null but is not: ${typeof value}`)
                          .build();
            case 'isNotNil':
                return value !== undefined && value !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`value is not expected to be undefined or null but is: ${typeof value}`)
                          .build();
        }
    }

    /**
     * @override
     */
    protected typeGuard(): void {}
}
