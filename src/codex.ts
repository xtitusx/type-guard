import { Iso3166Part1Alpha2, iso3166Part1Alpha2Codes } from './dictionaries/iso-3166-part1-alpha-2.enum';
import { Iso3166Part1Alpha3, iso3166Part1Alpha3Codes } from './dictionaries/iso-3166-part1-alpha-3.enum';
import { Iso4217Alpha3, iso4217Alpha3Codes } from './dictionaries/iso-4217-alpha-3.enum';
import { Iso639Part1Alpha2, iso639Part1Alpha2Codes } from './dictionaries/iso-639-part1-alpha-2.enum';
import { Iso639Part2Alpha3, iso639Part2Alpha3Codes } from './dictionaries/iso-639-part2-alpha-3.enum';

export class Codex {
    /**
     * ISO 3166-1 alpha-2 codes are two-letter country codes defined in ISO 3166-1, part of the ISO 3166 standard.
     * @see {@link https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2}
     */
    public static iso3166Part1Alpha2Codes(): Iso3166Part1Alpha2[] {
        return iso3166Part1Alpha2Codes();
    }

    /**
     * ISO 3166-1 alpha-3 codes are three-letter country codes defined in ISO 3166-1, part of the ISO 3166 standard.
     * @see {@link https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3}
     */
    public static iso3166Part1Alpha3Codes(): Iso3166Part1Alpha3[] {
        return iso3166Part1Alpha3Codes();
    }

    /**
     * ISO 4217 alpha codes are three-letter codes that represent National and X currencies.
     *
     * Last table update: 2018-08-29.
     * @see {@link https://en.wikipedia.org/wiki/ISO_4217}
     */
    public static iso4217Alpha3Codes(): Iso4217Alpha3[] {
        return iso4217Alpha3Codes();
    }

    /**
     * ISO 639-1:2002, Codes for the representation of names of languages—Part 1: Alpha-2 code, is the first part of the ISO 639 series of international standards for language codes.
     *
     * Part 1 covers the registration of two-letter codes.
     *
     * There are 184 two-letter codes registered as of December 2018.
     *
     * The registered codes cover the world's major languages.
     * @see {@link https://en.wikipedia.org/wiki/ISO_639-1}
     */
    public static iso639Part1Alpha2Codes(): Iso639Part1Alpha2[] {
        return iso639Part1Alpha2Codes();
    }

    /**
     * ISO 639-2:1998, Codes for the representation of names of languages — Part 2: Alpha-3 code, is the second part of the ISO 639 standard, which lists codes for the representation of the names of languages.
     *
     * The three-letter codes given for each language in this part of the standard are referred to as "Alpha-3" codes.
     *
     * There are 487 entries in the list of ISO 639-2 codes.
     * @see {@link https://en.wikipedia.org/wiki/ISO_639-2}
     */
    public static iso639Part2Alpha3Codes(): Iso639Part2Alpha3[] {
        return iso639Part2Alpha3Codes();
    }
}
