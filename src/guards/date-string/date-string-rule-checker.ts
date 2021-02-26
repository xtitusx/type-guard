import { DateStringRule } from './date-string-types';

import { RuleChecker } from '../../core/rule-checker';

/**
 * @class DateStringRuleChecker
 */
export abstract class DateStringRuleChecker<T extends DateStringRule> extends RuleChecker<T> {
    protected value: string;

    constructor(rule: T, value: string) {
        super(rule, value);
    }
}
