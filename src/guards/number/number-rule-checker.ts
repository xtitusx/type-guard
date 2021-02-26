import { NumberRule } from './types';

import { RuleChecker } from '../../core/rule-checker';

/**
 * @class NumberRuleChecker
 */
export abstract class NumberRuleChecker<T extends NumberRule> extends RuleChecker<T> {
    protected value: number;

    constructor(rule: T, value: number) {
        super(rule, value);
    }
}
