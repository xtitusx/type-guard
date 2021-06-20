import { StringRuleChecker } from './string-rule-checker';
import { Alphabet } from './string-types';

import { GuardResult } from '../../core/guard-result';

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

export const DAN_PATTERN = '^[a-zA-ZÆæØøÅåÉéǾǿ]+$';
export const DEU_PATTERN = '^[a-zA-ZÄäÖöÜüẞß]+$';
export const EST_PATTERN = '^[abd-pr-vzABD-PR-VZŠšŽžÕõÄäÖöÜü]+$';
export const FIN_PATTERN = '^[a-zA-ZÅåÄäÖöŠšŽž]+$';
export const FRA_PATTERN = '^[a-zA-ZÀàÂâÆæÇçÉéÈèÊêËëÎîÏïÔôŒœÙùÛûÜüŸÿ]+$';
export const GLE_PATTERN = '^[a-il-pr-vA-IL-PR-VÁáÉéÍíÓóÚú]+$';
export const HUN_PATTERN = '^[a-zA-ZÁáÉéÍíÓóÖöŐőÚúÜüŰű]+$';
export const ISL_PATTERN = '^[AaÁáBbDdÐðEeÉéFfGgHhIiÍíJjKkLlMmNnOoÓóPpRrSsTtUuÚúVvXxYyÝýÞþÆæÖö]+$';
export const ITA_PATTERN = '^[a-zA-ZÀàÉéÈèÍíÌìÎîÓóÒòÚúÙù]+$';
export const NLD_PATTERN = '^[a-zA-ZÁáÉéËëÍíÏïÓóÖöÚúÜü]+$';
export const NOR_PATTERN = '^[a-zA-ZÆæØøÅåÉéÈèÊêÓóÒòÂâÔôŪūĀāĒē]+$';
export const POL_PATTERN = '^[a-zA-ZĄąĆćĘęŁłŃńÓóŚśŹźŻż]+$';
export const POR_PATTERN = '^[a-zA-ZÁáÀàÂâÃãÉéÊêÈèÍíÌìÓóÔôÕõÒòÚúÙù]+$';
export const SPA_PATTERN = '^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü]+$';
export const SWE_PATTERN = '^[a-zA-ZÅåÄäÖöÁáÉéÈèÜü]+$';

export class StringIsAlpha extends StringRuleChecker<{ type: 'isAlpha'; alphabet?: Alphabet }> {
    constructor(rule: { type: 'isAlpha'; alphabet?: Alphabet }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        switch (this.rule.alphabet) {
            case 'dan':
                return this.isDanish()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to only contain danish characters but does not: ${this.value}`
                          )
                          .build();
            case 'deu':
                return this.isGerman()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to only contain german characters but does not: ${this.value}`
                          )
                          .build();
            case 'est':
                return this.isEstonian()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to only contain estonian characters but does not: ${this.value}`
                          )
                          .build();
            case 'fin':
                return this.isFinnish()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to only contain finnish characters but does not: ${this.value}`
                          )
                          .build();
            case 'fra':
                return this.isFrench()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to only contain french characters but does not: ${this.value}`
                          )
                          .build();

            case 'gle':
                return this.isIrish()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to only contain irish characters but does not: ${this.value}`
                          )
                          .build();
            case 'hun':
                return this.isHungarian()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to only contain hungarian characters but does not: ${this.value}`
                          )
                          .build();
            case 'isl':
                return this.isIcelandic()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to only contain icelandic characters but does not: ${this.value}`
                          )
                          .build();
            case 'ita':
                return this.isItalian()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to only contain italian characters but does not: ${this.value}`
                          )
                          .build();

            case 'nld':
                return this.isDutch()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to only contain dutch characters but does not: ${this.value}`
                          )
                          .build();
            case 'nor':
                return this.isNorwegian()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to only contain norwegian characters but does not: ${this.value}`
                          )
                          .build();
            case 'pol':
                return this.isPolish()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to only contain polish characters but does not: ${this.value}`
                          )
                          .build();
            case 'por':
                return this.isPortuguese()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to only contain portuguese characters but does not: ${this.value}`
                          )
                          .build();
            case 'precomposed-latin':
                return this.isPrecomposedLatin()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to only contain precomposed Latin characters but does not: ${this.value}`
                          )
                          .build();
            case 'spa':
                return this.isSpanish()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to only contain spanish characters but does not: ${this.value}`
                          )
                          .build();
            case 'swe':
                return this.isSwedish()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to only contain swedish characters but does not: ${this.value}`
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

    private isDanish(): boolean {
        return this.value.match(new RegExp(DAN_PATTERN)) !== null;
    }

    private isDutch(): boolean {
        return this.value.match(new RegExp(NLD_PATTERN)) !== null;
    }

    private isEstonian(): boolean {
        return this.value.match(new RegExp(EST_PATTERN)) !== null;
    }

    private isFinnish(): boolean {
        return this.value.match(new RegExp(FIN_PATTERN)) !== null;
    }

    private isFrench(): boolean {
        return this.value.match(new RegExp(FRA_PATTERN)) !== null;
    }

    private isGerman(): boolean {
        return this.value.match(new RegExp(DEU_PATTERN)) !== null;
    }

    private isHungarian(): boolean {
        return this.value.match(new RegExp(HUN_PATTERN)) !== null;
    }

    private isIrish(): boolean {
        return this.value.match(new RegExp(GLE_PATTERN)) !== null;
    }

    private isIcelandic(): boolean {
        return this.value.match(new RegExp(ISL_PATTERN)) !== null;
    }

    private isItalian(): boolean {
        return this.value.match(new RegExp(ITA_PATTERN)) !== null;
    }

    private isNorwegian(): boolean {
        return this.value.match(new RegExp(NOR_PATTERN)) !== null;
    }

    private isPolish(): boolean {
        return this.value.match(new RegExp(POL_PATTERN)) !== null;
    }

    private isPortuguese(): boolean {
        return this.value.match(new RegExp(POR_PATTERN)) !== null;
    }

    private isPrecomposedLatin(): boolean {
        return (
            this.value
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .match(new RegExp(PARTIAL_PRECOMPOSED_LATIN_PATTERN)) !== null
        );
    }

    private isSpanish(): boolean {
        return this.value.match(new RegExp(SPA_PATTERN)) !== null;
    }

    private isSwedish(): boolean {
        return this.value.match(new RegExp(SWE_PATTERN)) !== null;
    }
}
