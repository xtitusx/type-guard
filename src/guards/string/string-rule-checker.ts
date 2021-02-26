import { StringRule } from './string-types';

import { RuleChecker } from '../../core/rule-checker';

/**
 * @class StringRuleChecker
 */
export abstract class StringRuleChecker<T extends StringRule> extends RuleChecker<T> {
    protected value: string;

    constructor(rule: T, value: string) {
        super(rule, value);
    }
}
