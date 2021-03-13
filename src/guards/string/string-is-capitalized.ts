import { StringRuleChecker } from './string-rule-checker';
import { CapitalizationStyle } from './string-types';

import { GuardResult } from '../../core/guard-result';

export class StringIsCapitalized extends StringRuleChecker<{ type: 'isCapitalized'; style: CapitalizationStyle }> {
    constructor(rule: { type: 'isCapitalized'; style: CapitalizationStyle }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        switch (this.rule.style) {
            case 'firstChar':
                return this.checkFirstChar(this.value)
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to follow first character capitalization style but is not: ${this.value}`
                          )
                          .build();

            case 'startCase':
                return this.checkStartCase()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to follow start case capitalization style but is not: ${this.value}`
                          )
                          .build();
        }
    }

    private checkFirstChar(value: string): boolean {
        return value.length === 0 || value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() === value
            ? true
            : false;
    }

    private checkStartCase(): boolean {
        return this.value.split(/\s+/).find((word) => this.checkFirstChar(word) === false) ? false : true;
    }
}
