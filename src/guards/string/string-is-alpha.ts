import { StringRuleChecker } from './string-rule-checker';
import { Alphabet } from './string-types';

import { GuardResult } from '../../core/guard-result';

/**
 * Basic Latin pattern:
 * - Not case sensitive.
 */
export const BASIC_LATIN_PATTERN = '^[a-zA-Z]+$';

/**
 * Partial precomposed Latin pattern.
 */
const PARTIAL_PRECOMPOSED_LATIN_PATTERN = '^[a-zA-ZÀ-ÖØ-öø-ŸʒƷſß]+$';

export class StringIsAlpha extends StringRuleChecker<{ type: 'isAlpha'; alphabet?: Alphabet }> {
    constructor(rule: { type: 'isAlpha'; alphabet?: Alphabet }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        switch (this.rule.alphabet) {
            case 'basic-latin':
                return this.isBasicLatin()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to only contain basic Latin characters but does not: ${this.value}`
                          )
                          .build();
            case 'precomposed-latin':
            default:
                return this.isPrecomposedLatin()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to only contain precomposed Latin characters but does not: ${this.value}`
                          )
                          .build();
        }
    }

    private isBasicLatin(): boolean {
        return this.value.match(new RegExp(BASIC_LATIN_PATTERN)) !== null;
    }

    private isPrecomposedLatin(): boolean {
        return (
            this.value
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .match(new RegExp(PARTIAL_PRECOMPOSED_LATIN_PATTERN)) !== null
        );
    }
}
