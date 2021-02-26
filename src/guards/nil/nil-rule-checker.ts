import { NilRule } from './nil-types';

import { RuleChecker } from '../../core/rule-checker';

/**
 * @class NilRuleChecker
 */
export abstract class NilRuleChecker<T extends NilRule> extends RuleChecker<T> {
    protected value: unknown;

    constructor(rule: T, value: unknown) {
        super(rule, value);
    }
}
