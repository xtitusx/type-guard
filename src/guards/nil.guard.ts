import { NilRule } from './nil/nil-types';
import { NilIsUndefined } from './nil/nil-is-undefined';
import { NilIsNotUndefined } from './nil/nil-is-not-undefined';
import { NilIsNull } from './nil/nil-is-null';
import { NilIsNotNull } from './nil/nil-is-not-null';
import { NilIsNil } from './nil/nil-is-nil';
import { NilIsNotNil } from './nil/nil-is-not-nil';

import { Guard } from '../core/guard';
import { GuardResult } from '../core/guard-result';

export class NilGuard extends Guard<NilRule> {
    constructor(rules?: NilRule[]) {
        super(rules);
    }

    /**
     * Checks if value is undefined.
     * @remarks Chainable method.
     */
    public isUndefined(): this {
        this.addRule({ type: 'isUndefined' });
        return this;
    }

    /**
     * Checks if value is not undefined.
     * @remarks Chainable method.
     */
    public isNotUndefined(): this {
        this.addRule({ type: 'isNotUndefined' });
        return this;
    }

    /**
     * Checks if value is null.
     * @remarks Chainable method.
     */
    public isNull(): this {
        this.addRule({ type: 'isNull' });
        return this;
    }

    /**
     * Checks if value is not null.
     * @remarks Chainable method.
     */
    public isNotNull(): this {
        this.addRule({ type: 'isNotNull' });
        return this;
    }

    /**
     * Checks if value is undefined or null.
     * @remarks Chainable method.
     */
    public isNil(): this {
        this.addRule({ type: 'isNil' });
        return this;
    }

    /**
     * Checks if value is neither undefined nor null.
     * @remarks Chainable method.
     */
    public isNotNil(): this {
        this.addRule({ type: 'isNotNil' });
        return this;
    }

    /**
     * @override
     * @param rule
     * @param value
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
