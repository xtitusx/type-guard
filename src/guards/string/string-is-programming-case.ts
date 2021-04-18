import { StringRuleChecker } from './string-rule-checker';
import { ProgrammingConvention } from './string-types';

import { GuardResult } from '../../core/guard-result';

/**
 * PascalCase naming convention pattern:
 * - The first letter is capitalized.
 * - The word does not end on a capitalized letter: PascalCasE
 * - No two capitalised letters shall follow directly each other: PascalCAse
 * - No number in that word at any place: PascalCase1more
 * - No dot(.), under_score or dash (-) within the word, only letters: Pascal_Case
 * - Empty string allowed.
 */
export const PASCAL_CASE_PATTERN = '((^$)|(^(([A-Z])|(([A-Z][a-z]+)+))$))';

/**
 * camelCase naming convention pattern:
 * - The first letter is not capitalized.
 * - The word does not end on a capitalized letter: camelCasE
 * - No two capitalised letters shall follow directly each other: camelCAse
 * - No number in that word at any place: camelCase1more
 * - No dot(.), under_score or dash (-) within the word, only letters: camel_Case
 * - Empty string allowed.
 */
export const CAMEL_CASE_PATTERN = '((^$)|(^(([a-z])|(([a-z]+[A-Z]?)+[a-z]+))$))';

/**
 * quiet_snake_case naming convention pattern:
 * - At least one leading letter or number (not underscore).
 * - All letters are lowercase.
 * - Numbers allowed.
 * - All spaces between words are filled with underscores.
 * - Remove all punctuation.
 * - A "word" should never consist of a single letter unless it is the last "word".
 * - Empty string allowed.
 */
export const QUIET_SNAKE_CASE_PATTERN = '((^$)|(^(([a-z0-9]+)|(([a-z0-9]{2,}[_])+[a-z0-9]+))$))';

/**
 * SCREAMING_SNAKE_CASE naming convention pattern:
 * - At least one leading letter or number (not underscore).
 * - All letters are uppercase.
 * - Numbers allowed.
 * - All spaces between words are filled with underscores.
 * - Remove all punctuation.
 * - A "word" should never consist of a single letter unless it is the last "word".
 * - Empty string allowed.
 */
export const SCREAMING_SNAKE_CASE_PATTERN = '((^$)|(^(([A-Z0-9]+)|(([A-Z0-9]{2,}[_])+[A-Z0-9]+))$))';

/**
 * kebab-case naming convention pattern:
 * - At least one leading letter or number (not hyphen).
 * - All letters are lowercase.
 * - Numbers allowed.
 * - All spaces between words are filled with hyphens.
 * - Remove all punctuation.
 * - A "word" should never consist of a single letter unless it is the last "word".
 * - Empty string allowed.
 */
export const KEBAB_CASE_PATTERN = '((^$)|(^(([a-z0-9]+)|(([a-z0-9]{2,}[-])+[a-z0-9]+))$))';

/**
 * dot.case naming convention pattern:
 * - At least one leading letter or number (not dot).
 * - All letters are lowercase.
 * - Numbers allowed.
 * - All spaces between words are filled with dots.
 * - Remove all punctuation.
 * - A "word" should never consist of a single letter unless it is the last "word".
 * - Empty string allowed.
 */
export const DOT_CASE_PATTERN = '((^$)|(^(([a-z0-9]+)|(([a-z0-9]{2,}[.])+[a-z0-9]+))$))';

export class StringIsProgrammingCase extends StringRuleChecker<{
    type: 'isProgrammingCase';
    convention: ProgrammingConvention;
}> {
    constructor(rule: { type: 'isProgrammingCase'; convention: ProgrammingConvention }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        switch (this.rule.convention) {
            case 'PascalCase':
                return this.isPascalCase()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to follow PascalCase naming convention but does not: ${this.value}`
                          )
                          .build();
            case 'camelCase':
                return this.isCamelCase()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to follow camelCase naming convention but does not: ${this.value}`
                          )
                          .build();
            case 'quiet_snake_case':
                return this.isQuietSnakeCase()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to follow quiet_snake_case naming convention but does not: ${this.value}`
                          )
                          .build();
            case 'SCREAMING_SNAKE_CASE':
                return this.isScreamingSnakeCase()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to follow SCREAMING_SNAKE_CASE naming convention but does not: ${this.value}`
                          )
                          .build();
            case 'kebab-case':
                return this.isKebabCase()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to follow kebab-case naming convention but does not: ${this.value}`
                          )
                          .build();
            case 'dot.case':
                return this.isDotCase()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to follow dot.case naming convention but does not: ${this.value}`
                          )
                          .build();
        }
    }

    private isPascalCase(): boolean {
        return this.value.match(new RegExp(PASCAL_CASE_PATTERN)) !== null;
    }

    private isCamelCase(): boolean {
        return this.value.match(new RegExp(CAMEL_CASE_PATTERN)) !== null;
    }

    private isQuietSnakeCase(): boolean {
        return this.value.match(new RegExp(QUIET_SNAKE_CASE_PATTERN)) !== null;
    }

    private isScreamingSnakeCase(): boolean {
        return this.value.match(new RegExp(SCREAMING_SNAKE_CASE_PATTERN)) !== null;
    }

    private isKebabCase(): boolean {
        return this.value.match(new RegExp(KEBAB_CASE_PATTERN)) !== null;
    }

    private isDotCase(): boolean {
        return this.value.match(new RegExp(DOT_CASE_PATTERN)) !== null;
    }
}
