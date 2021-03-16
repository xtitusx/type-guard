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
                              } allowed, capitalization style but does not: ${this.value}`
                          )
                          .build();

            case 'startCase':
                return this.checkStartCase()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to follow start case, ${
                                  this.rule.checkFirstCharIsLetter === true
                                      ? 'only a letter'
                                      : 'alphanumeric or special'
                              } allowed, capitalization style but does not: ${this.value}`
                          )
                          .build();
        }
    }

    /**
     * Checks if first encountered character is capitalized, even if it's not letter.
     * @param value
     * @returns
     */
    private checkFirstChar(value: string): boolean {
        return value.length === 0 || value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() === value
            ? true
            : false;
    }

    /**
     * Checks if first encountered character is mandatorily a capitalized letter.
     * @param value
     * @returns
     */
    private checkFirstCharIsLetter(value: string): boolean {
        return (
            this.checkFirstChar(value) &&
            (value.length === 0 || (value.charCodeAt(0) >= 65 && value.charCodeAt(0) <= 90))
        );
    }

    /**
     * Checks if string follows start case capitalization, in a strict or permissive style.
     * @param value
     * @returns
     */
    private checkStartCase(): boolean {
        return this.value
            .split(/\s+/)
            .find((word) =>
                this.rule.checkFirstCharIsLetter === true
                    ? this.checkFirstCharIsLetter(word) === false
                    : this.checkFirstChar(word) === false
            )
            ? false
            : true;
    }
}
