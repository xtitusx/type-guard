import { ArrayRule } from './array-types';

import { RuleChecker } from '../../core/rule-checker';

export abstract class ArrayRuleChecker<T extends ArrayRule> extends RuleChecker<T> {
    protected value: unknown[];

    constructor(rule: T, value: unknown[]) {
        super(rule, value);
    }
}
