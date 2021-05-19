import { StringRuleChecker } from './string-rule-checker';
import { Alphabet } from './string-types';

import { GuardResult } from '../../core/guard-result';
import { Iso639Part2Alpha3Enum } from '../../dictionaries/iso-639-part2-alpha-3.enum';

/**
 * Basic Latin range.
 * @see {@link https://en.wikipedia.org/wiki/ISO_basic_Latin_alphabet}
 */
const BASIC_LATIN = 'a-zA-Z';

/**
 * Latin Latin-1 Supplement range.
 * @see {@link https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)}
 */
const LATIN_1_SUPPLEMENT = `À-ÖØ-öø-ÿ`;

/**
 * Latin Extended-A range.
 * @see {@link https://en.wikipedia.org/wiki/Latin_Extended-A}
 */
const LATIN_EXTENDED_A = `Ā-ſ`;

/**
 * Latin Extended-B range.
 * @see {@link https://en.wikipedia.org/wiki/Latin_Extended-B}
 */
const LATIN_EXTENDED_B = `ƀ-ɏ`;

/**
 * Latin Extended Additional range.
 * @see {@link https://en.wikipedia.org/wiki/Latin_Extended_Additional}
 */
const LATIN_EXTENDED_ADDITIONAL = `Ḁ-ỿ`;

/**
 * @see {@link https://en.wikipedia.org/wiki/IPA_Extensions}
 * @see {@link https://fr.wikipedia.org/wiki/Lettres_suppl%C3%A9mentaires_de_l%27alphabet_latin}
 */
const IPA_EXTENSIONS_LETTERS = `ʒ`;

/**
 * Latin trigram letters.
 * @see {@link https://fr.wikipedia.org/wiki/Liste_de_digrammes_et_trigrammes}
 */
const LATIN_TRIGRAM_LETTERS = `CʼH|Cʼh|cʼh`;

/**
 * Partial precomposed Latin pattern.
 */
const PARTIAL_PRECOMPOSED_LATIN_PATTERN = `^([${BASIC_LATIN}${LATIN_1_SUPPLEMENT}${LATIN_EXTENDED_A}${LATIN_EXTENDED_B}${LATIN_EXTENDED_ADDITIONAL}${IPA_EXTENSIONS_LETTERS}]|${LATIN_TRIGRAM_LETTERS})+$`;

export const FRENCH_PATTERN = '^[a-zA-ZÀàÂâÆæÇçÉéÈèÊêËëÎîÏïÔôŒœÙùÛûÜüŸÿ]+$';

export class StringIsAlpha extends StringRuleChecker<{ type: 'isAlpha'; alphabet?: Alphabet }> {
    constructor(rule: { type: 'isAlpha'; alphabet?: Alphabet }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        switch (this.rule.alphabet) {
            case 'precomposed-latin':
                return this.isPrecomposedLatin()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to only contain precomposed Latin characters but does not: ${this.value}`
                          )
                          .build();
            case Iso639Part2Alpha3Enum.fre:
                return this.isFrench()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to only contain french characters but does not: ${this.value}`
                          )
                          .build();
            case 'basic-latin':
            default:
                return this.isBasicLatin()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to only contain basic Latin characters but does not: ${this.value}`
                          )
                          .build();
        }
    }

    private isBasicLatin(): boolean {
        return this.value.match(new RegExp(`^[${BASIC_LATIN}]+$`)) !== null;
    }

    private isPrecomposedLatin(): boolean {
        return (
            this.value
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .match(new RegExp(PARTIAL_PRECOMPOSED_LATIN_PATTERN)) !== null
        );
    }

    private isFrench(): boolean {
        return this.value.match(new RegExp(FRENCH_PATTERN)) !== null;
    }
}
