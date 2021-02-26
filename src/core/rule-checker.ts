import { Rule } from './guard';
import { GuardResult } from './guard-result';

/**
 * @class RuleChecker
 */
export abstract class RuleChecker<T extends Rule> {
    protected rule: T;
    protected value: unknown;

    constructor(rule: T, value: unknown) {
        this.rule = rule;
        this.value = value;
    }

    /**
     * Runs check implementation.
     */
    public abstract exec(): GuardResult;
}
