import { NilRule } from './nil/nil-types';
import { NilIsUndefined } from './nil/nil-is-undefined';
import { NilIsNotUndefined } from './nil/nil-is-not-undefined';
import { NilIsNull } from './nil/nil-is-null';
import { NilIsNotNull } from './nil/nil-is-not-null';
import { NilIsNil } from './nil/nil-is-nil';
import { NilIsNotNil } from './nil/nil-is-not-nil';

import { Guard } from '../core/guard';
import { GuardResult } from '../core/guard-result';

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
                return new NilIsUndefined(rule, value).exec();
            case 'isNotUndefined':
                return new NilIsNotUndefined(rule, value).exec();
            case 'isNull':
                return new NilIsNull(rule, value).exec();
            case 'isNotNull':
                return new NilIsNotNull(rule, value).exec();
            case 'isNil':
                return new NilIsNil(rule, value).exec();
            case 'isNotNil':
                return new NilIsNotNil(rule, value).exec();
        }
    }

    /**
     * @override
     */
    protected typeGuard(): void {}
}
