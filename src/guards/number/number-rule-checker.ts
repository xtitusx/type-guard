import { NumberRule } from './number-types';

import { RuleChecker } from '../../core/rule-checker';

export abstract class NumberRuleChecker<T extends NumberRule> extends RuleChecker<T> {
    protected value: number;

    constructor(rule: T, value: number) {
        super(rule, value);
    }
}
