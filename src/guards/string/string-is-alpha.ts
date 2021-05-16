import { StringRuleChecker } from './string-rule-checker';
import { Alphabet } from './string-types';

import { GuardResult } from '../../core/guard-result';

/**
 * Basic Latin pattern:
 * - Not case sensitive.
 * @see {@link https://en.wikipedia.org/wiki/ISO_basic_Latin_alphabet}
 */
const BASIC_LATIN_PATTERN = 'a-zA-Z';

/**
 * Latin Latin-1 Supplement pattern.
 * @see {@link https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)}
 */
const LATIN_1_SUPPLEMENT_PATTERN = `À-ÖØ-öø-ÿ`;

/**
 * Latin Extended-A pattern.
 * @see {@link https://en.wikipedia.org/wiki/Latin_Extended-A}
 */
const LATIN_EXTENDED_A_PATTERN = `Ā-ſ`;

/**
 * Latin Extended-B pattern.
 * @see {@link https://en.wikipedia.org/wiki/Latin_Extended-B}
 */
const LATIN_EXTENDED_B_PATTERN = `ƀ-ɏ`;

/**
 * Latin Extended Additional pattern.
 * @see {@link https://en.wikipedia.org/wiki/Latin_Extended_Additional}
 */
const LATIN_EXTENDED_ADDITIONAL_PATTERN = `Ḁ-ỿ`;

/**
 * @see {@link https://en.wikipedia.org/wiki/IPA_Extensions}
 * @see {@link https://fr.wikipedia.org/wiki/Lettres_suppl%C3%A9mentaires_de_l%27alphabet_latins}
 */
const IPA_EXTENSIONS_PATTERN = `ʒ`;

/**
 * Latin trigram pattern.
 * @see {@link https://fr.wikipedia.org/wiki/Liste_de_digrammes_et_trigrammes}
 */
const TRIGRAM_PATTERN = `((CʼH)|(Cʼh)|(cʼh))*`;

/**
 * Partial precomposed Latin pattern.
 */
const PARTIAL_PRECOMPOSED_LATIN_PATTERN = `^[${BASIC_LATIN_PATTERN}${LATIN_1_SUPPLEMENT_PATTERN}${LATIN_EXTENDED_A_PATTERN}${LATIN_EXTENDED_B_PATTERN}${LATIN_EXTENDED_ADDITIONAL_PATTERN}${IPA_EXTENSIONS_PATTERN}]+$`;

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
        return this.value.match(new RegExp(`^[${BASIC_LATIN_PATTERN}]+$`)) !== null;
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
