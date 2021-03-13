import { StringRuleChecker } from './string-rule-checker';
import { CapitalizationStyle } from './string-types';

import { GuardResult } from '../../core/guard-result';

export class StringIsCapitalized extends StringRuleChecker<{
    type: 'isCapitalized';
    style: CapitalizationStyle;
    checkFirstCharIsLetter?: boolean;
}> {
    constructor(
        rule: { type: 'isCapitalized'; style: CapitalizationStyle; checkFirstCharIsLetter?: boolean },
        value: string
    ) {
        super(rule, value);
        if (this.rule.checkFirstCharIsLetter !== false) {
            this.rule.checkFirstCharIsLetter = true;
        }
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        switch (this.rule.style) {
            case 'firstChar':
                return (
                    this.rule.checkFirstCharIsLetter === true
                        ? this.checkFirstCharIsLetter(this.value)
                        : this.checkFirstChar(this.value)
                )
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to follow first character, ${
                                  this.rule.checkFirstCharIsLetter === true
                                      ? 'only a letter'
                                      : 'alphanumeric or special'
                              }, capitalization style but is not: ${this.value}`
                          )
                          .build();

            case 'startCase':
                if (this.rule.checkFirstCharIsLetter === false) {
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
    }

    private checkFirstChar(value: string): boolean {
        return value.length === 0 || value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() === value
            ? true
            : false;
    }

    private checkFirstCharIsLetter(value: string): boolean {
        return (
            this.checkFirstChar(value) &&
            (value.length === 0 || (value.charCodeAt(0) >= 65 && value.charCodeAt(0) <= 90))
        );
    }

    private checkStartCase(): boolean {
        return this.value.split(/\s+/).find((word) => this.checkFirstChar(word) === false) ? false : true;
    }
}
