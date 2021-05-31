import { Iso3166Part1Alpha2Enum } from './dictionaries/iso-3166-part1-alpha-2.enum';
import { Iso3166Part1Alpha3Enum } from './dictionaries/iso-3166-part1-alpha-3.enum';
import { Iso4217Alpha3Enum } from './dictionaries/iso-4217-alpha-3.enum';
import { Iso639Part1Alpha2Enum } from './dictionaries/iso-639-part1-alpha-2.enum';
import { Iso639Part2Alpha3Enum } from './dictionaries/iso-639-part2-alpha-3.enum';

export class Codex {
    /**
     * @returns {@link Iso3166Part1Alpha2Enum | List of ISO 3166-1 alpha-2 country codes}
     */
    public static iso3166Part1Alpha2Enum(): typeof Iso3166Part1Alpha2Enum {
        return Iso3166Part1Alpha2Enum;
    }

    /**
     * @returns {@link Iso3166Part1Alpha3Enum | List of ISO 3166-1 alpha-3 country codes}
     */
    public static iso3166Part1Alpha3Enum(): typeof Iso3166Part1Alpha3Enum {
        return Iso3166Part1Alpha3Enum;
    }

    /**
     * @returns {@link Iso4217Alpha3Enum | List of active ISO 4217 alpha-3 currency codes}
     */
    public static iso4217Alpha3Enum(): typeof Iso4217Alpha3Enum {
        return Iso4217Alpha3Enum;
    }

    /**
     * @returns {@link Iso639Part1Alpha2Enum | List of 184 ISO 639-1 alpha-2 language codes}
     */
    public static iso639Part1Alpha2Enum(): typeof Iso639Part1Alpha2Enum {
        return Iso639Part1Alpha2Enum;
    }

    /**
     * @returns {@link Iso639Part2Alpha3Enum | List of 487 ISO 639-2 alpha-3 language codes}
     */
    public static iso639Part2Alpha3Enum(): typeof Iso639Part2Alpha3Enum {
        return Iso639Part2Alpha3Enum;
    }
}
