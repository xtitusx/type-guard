import { Rule } from './guard';
import { GuardResult } from './guard-result';

export abstract class RuleChecker<T extends Rule> {
    protected rule: T;
    protected value: unknown;

    constructor(rule: T, value: unknown) {
        this.rule = rule;
        this.value = value;
    }

    /**
     * Runs rule checker implementation.
     */
    public abstract exec(): GuardResult;
}
