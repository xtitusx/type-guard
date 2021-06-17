import { IIsDecimalOptions } from './string/string-options';

import {
    StringRule,
    CapitalizationStyle,
    EmailAddressDefinition,
    TrimmedSide,
    HexColorDigits,
    ProgrammingConvention,
    IpVersion,
    GeoCoordinatesFormat,
    AlphaVersion,
    Base64Implementation,
    JsonFormat,
    Alphabet,
} from './string/string-types';

import { StringContains } from './string/string-contains';
import { StringEquals } from './string/string-equals';
import { StringHasLength } from './string/string-has-length';
import { StringHasMaxLength } from './string/string-has-max-length';
import { StringHasMinLength } from './string/string-has-min-length';
import { StringIsAlpha } from './string/string-is-alpha';
import { StringIsAlphaNumeric } from './string/string-is-alpha-numeric';
import { StringIsAscii } from './string/string-is-ascii';
import { StringIsBase64 } from './string/string-is-base64';
import { StringIsBinary } from './string/string-is-binary';
import { StringIsCapitalized } from './string/string-is-capitalized';
import { StringIsDecimal } from './string/string-is-decimal';
import { StringIsEmailAddress } from './string/string-is-email-address';
import { StringIsEmpty } from './string/string-is-empty';
import { StringIsHex } from './string/string-is-hex';
import { StringIsHexColor } from './string/string-is-hex-color';
import { StringIsIn } from './string/string-is-in';
import { StringIsIpAddress } from './string/string-is-ip-address';
import { StringIsIso3166Part1Alpha } from './string/string-is-iso-3166-part1-alpha';
import { StringIsIso4217Alpha3 } from './string/string-is-iso-4217-alpha-3';
import { StringIsIso639Part1Alpha2 } from './string/string-is-iso-639-part1-alpha-2';
import { StringIsIso639Part2Alpha3 } from './string/string-is-iso-639-part2-alpha-3';
import { StringIsJson } from './string/string-is-json';
import { StringIsLatLong } from './string/string-is-lat-long';
import { StringIsLatitude } from './string/string-is-latitude';
import { StringIsLongitude } from './string/string-is-longitude';
import { StringIsLowercase } from './string/string-is-lowercase';
import { StringIsMacAddress } from './string/string-is-mac-address';
import { StringIsNotEmpty } from './string/string-is-not-empty';
import { StringIsNumeric } from './string/string-is-numeric';
import { StringIsObjectId } from './string/string-is-object-id';
import { StringIsOctal } from './string/string-is-octal';
import { StringIsProgrammingCase } from './string/string-is-programming-case';
import { StringIsTrimmed } from './string/string-is-trimmed';
import { StringIsUppercase } from './string/string-is-uppercase';
import { StringIsUuidv4 } from './string/string-is-uuid-v4';
import { StringMatches } from './string/string-matches';
import { StringNotContains } from './string/string-not-contains';
import { StringNotEquals } from './string/string-not-equals';

import { Guard, IGuardOptions } from '../core/guard';
import { GuardResult } from '../core/guard-result';

export class StringGuard extends Guard<StringRule> {
    constructor(options?: IGuardOptions) {
        super(options);
    }

    /**
     * Checks if string contains the specified substring.
     * @remarks Chainable method.
     * ```ts
     * Rule:
     * - Case sensitive.
     * ```
     * @param value
     */
    public contains(value: string): this {
        this.addRule({ type: 'contains', value: value });
        return this;
    }

    /**
     * Checks if two string are equals.
     * @remarks Chainable method.
     * @param value
     */
    public equals(value: string): this {
        this.addRule({ type: 'equals', value: value });
        return this;
    }

    /**
     * Checks if string's length is equal to the specified number.
     * @remarks Chainable method.
     * @param value
     */
    public hasLength(value: number): this {
        this.addRule({ type: 'hasLength', value: value });
        return this;
    }

    /**
     * Checks if string's length is equal or smaller than the specified number.
     * @remarks Chainable method.
     * @param max
     */
    public hasMaxLength(max: number): this {
        this.addRule({ type: 'hasMaxLength', max: max });
        return this;
    }

    /**
     * Checks if string's length is equal or greater than to the specified number.
     * @remarks Chainable method.
     * @param min
     */
    public hasMinLength(min: number): this {
        this.addRule({ type: 'hasMinLength', min: min });
        return this;
    }

    /**
     * Checks if string only contains alpha characters.
     * @remarks Chainable method.
     * @param alphabet - {@link https://en.wikipedia.org/wiki/ISO_basic_Latin_alphabet | 'basic-latin'} |
     * {@link https://en.wikipedia.org/wiki/List_of_precomposed_Latin_characters_in_Unicode | 'precomposed-latin'} |
     * {@link https://en.wikipedia.org/wiki/Danish_orthography | 'dan'} |
     * {@link https://en.wikipedia.org/wiki/German_orthography | 'deu'} |
     * {@link https://en.wikipedia.org/wiki/Estonian_orthography | 'est'} |
     * {@link https://en.wikipedia.org/wiki/Finnish_orthography | 'fin'} |
     * {@link https://en.wikipedia.org/wiki/French_orthography | 'fra'} |
     * {@link https://en.wikipedia.org/wiki/Irish_orthography | 'gle'} |
     * {@link https://en.wikipedia.org/wiki/Icelandic_orthography | 'isl'} |
     * {@link https://en.wikipedia.org/wiki/Italian_orthography | 'ita'} |
     * {@link https://en.wikipedia.org/wiki/Dutch_orthography | 'nld'} |
     * {@link https://en.wikipedia.org/wiki/Norwegian_orthography | 'nor'} |
     * {@link https://en.wikipedia.org/wiki/Polish_orthography | 'pol'} |
     * {@link https://en.wikipedia.org/wiki/Portuguese_orthography | 'por'} |
     * {@link https://en.wikipedia.org/wiki/Spanish_orthography | 'spa'}
     * {@link https://en.wikipedia.org/wiki/Swedish_orthography | 'swe'}. Default is 'basic-latin'.
     * ```ts
     * alphabet:
     * - basic-latin: Basic latin consists of two sets of 26 letters. They are the same letters that comprise the English alphabet.
     * - precomposed-latin: Extended basic latin characters with diacritics such as é or ä, and ligatures such as Æ or ß.
     * ```
     * @see {@link https://unicode-table.com/en/}
     */
    public isAlpha(alphabet?: Alphabet): this {
        this.addRule({ type: 'isAlpha', alphabet });
        return this;
    }

    /**
     * Checks if string only contains basic-latin characters and/or numbers.
     * @remarks Chainable method.
     */
    public isAlphaNumeric(): this {
        this.addRule({ type: 'isAlphaNumeric' });
        return this;
    }

    /**
     * Checks if string only contains printable ASCII characters.
     * @remarks Chainable method.
     * @see {@link http://facweb.cs.depaul.edu/sjost/it212/documents/ascii-pr.htm} for details about the 95 printable characters in ASCII Table.
     * @see {@link https://donsnotes.com/tech/charsets/ascii.html} for details about all characters in ASCII Table.
     */
    public isAscii(): this {
        this.addRule({ type: 'isAscii' });
        return this;
    }

    /**
     * Checks if string is Base64 encoded.
     *
     * Base64 is a binary to ASCII encoding scheme.
     *
     * Because Base64 is a six-bit encoding, and because the decoded values are divided into 8-bit octets on a modern computer,
     * every four characters of Base64-encoded text (4 sextets = 24 bits) represents three octets of unencoded text or data (3 octets = 24 bits).
     * @remarks Chainable method.
     * @param impl - {@link BASE64_STANDARD_PATTERN | 'standard'} | {@link BASE64_FILE_NAME_PATTERN | 'fileName'} | {@link BASE64_URL_SAFE_PATTERN | 'urlSafe'}.
     * ```ts
     * impl:
     * - standard: Standard Base64 encoding scheme. The padding character is "=".
     * - fileName: Base64 for filenames uses "-" in place of "/". This is to work around the fact that Unix and Windows filenames cannot contain the character "/" since it’s used in file paths.
     * - urlSafe: Base64 for URLs uses "-" and "_" in the place of "+"" and "/" and omits padding the encoded string with "=". This is because URLs require special characters like +, / and = to be URL encoded into %2b, %2f and %3d, which makes the encoded string unnecessarily long.
     * ```
     * @see {@link https://en.wikipedia.org/wiki/Base64} for details.
     * @see {@link https://medium.com/swlh/powering-the-internet-with-base64-d823ec5df747} for Base64 implementations.
     * @example V2hhdCBoYXBwZW5zIHdoZW4geW91IGJhc2U2NCgpPw==
     */
    public isBase64(impl: Base64Implementation): this {
        this.addRule({ type: 'isBase64', impl });
        return this;
    }

    /**
     * Checks if string is a binary number (base-2).
     * @remarks Chainable method.
     * ```ts
     * Rule:
     * - ECMAScript 2015 introduces BinaryIntegerLiteral, prefixed with 0b or 0B (not supported by old browsers).
     * ```
     * @example 0, 1, 10, 11, 100, 11111111, 0b0, 0B0
     */
    public isBinary(): this {
        this.addRule({ type: 'isBinary' });
        return this;
    }

    /**
     * Checks if string follows a capitalization style.
     * @remarks Chainable method.
     * ```ts
     *  Rules:
     * - Basic-latin alphabet.
     * - Empty string allowed.
     * - Word divider is whitespace.
     * ```
     * @param style - 'firstChar' | 'startCase'
     * ```ts
     * style:
     * - firstChar: Only the first character is capitalized.
     * - startCase: All words, including articles, prepositions, and conjunctions, start with a capitalized character.
     * ```
     * @param checkFirstCharIsLetter - Strict or permissive style. Default is true (strict).
     * ```ts
     * true:
     * - in 'firstChar' style, the first encountered character is mandatorily a letter.
     * - in 'startCase' style, the first character of each encountered word is mandatorily a letter.
     *
     * false:
     * - in 'firstChar' style, the first encountered character can be either alphanumeric or special (even whitespace).
     * - in 'startCase' style, the first character of each encountered word can be either alphanumeric or special.
     * ```
     * @returns
     * ```ts
     * - true with ('firstChar', true) params for values: "Foo", "F", "Foo#", "", "Thirty eight is my age"
     * - false with ('firstChar', true) params for values: " Foo", "#foo"
     * - true with ('firstChar', false) params for values: "Foo", "F", "#foo", "     foo", "", "38 is my age"
     * - false with ('firstChar', false) params for values: "foo", "f", "#Foo", "     Foo", "38 is my Age"
     *
     * - true with ('startCase', true) params for values: "The Quick Brown Fox Jumps Over The Lazy Dog.", " Foo, Bar."
     * - false with ('startCase', true) params for value: "1 Quick Brown Fox Jumps Over The Lazy Dog."
     * - true with ('startCase', false) params for value: "1 Quick Brown Fox Jumps Over The Lazy Dog."
     * - false with ('startCase', false) params for value: "1 quick Brown Fox Jumps Over The Lazy Dog."
     * ```
     */
    public isCapitalized(style: CapitalizationStyle, checkFirstCharIsLetter?: boolean): this {
        this.addRule({ type: 'isCapitalized', style, checkFirstCharIsLetter });
        return this;
    }

    /**
     * Checks if string is a decimal number.
     *
     * A decimal separator is a symbol used to separate the integer part from the fractional part of a number written in decimal form.
     * @remarks Chainable method.
     * ```ts
     * Rule:
     * Supported decimal separators are point and comma.
     * ```
     * @param options - Additional options.
     * ```ts
     * options:
     * - force: Force number to have a decimal separator. Default is false.
     * - precision: Max number of digits to the right of the decimal point in the number.
     * ```
     * @see {@link https://en.wikipedia.org/wiki/Decimal_separator} for details.
     */
    public isDecimal(options?: IIsDecimalOptions): this {
        this.addRule({ type: 'isDecimal', options });
        return this;
    }

    /**
     * Checks if string is an email address.
     * @remarks Chainable method.
     * ```ts
     * Rules:
     * Lightened RFC 5322 (sections 3.2.3 and 3.4.1) and RFC 5321 implementation is omitting:
     * - IP addresses.
     * - domain-specific addresses.
     * - the syntax using double quotes and square brackets.
     * ```
     * @param def - {@link QUICK_EMAIL_ADDRESS_PATTERN | 'quick'} | {@link RFC5322_EMAIL_ADDRESS_PATTERN | 'rfc5322'}. Default is 'quick'.
     * ```ts
     * def:
     * - quick: Common implementation matching 99% of all email addresses in actual use today.
     * - rfc5322: Lightened RFC 5322 implementation matching 99.99%.
     * ```
     * @see {@link https://en.wikipedia.org/wiki/Email_address#Syntax} for syntax.
     * @see {@link http://www.regular-expressions.info/email.html} for regex details.
     * @example `John.Doe@example.com`
     */
    public isEmailAddress(def?: EmailAddressDefinition): this {
        this.addRule({ type: 'isEmailAddress', def: def });
        return this;
    }

    /**
     * Checks if string is empty.
     * @remarks Chainable method.
     * ```ts
     * Rule:
     * - Equals "".
     * ```
     */
    public isEmpty(): this {
        this.addRule({ type: 'isEmpty' });
        return this;
    }

    /**
     * Checks if string is a hexadecimal number (base-16).
     * @remarks Chainable method.
     * ```ts
     * Rules:
     * - ECMAScript 2015 introduces HexIntegerLiteral, prefixed with 0x or 0X (not supported by old browsers).
     * - Not case sensitive.
     * ```
     * @example F061A, f061a, 0xF061A, 0XF061A
     */
    public isHex(): this {
        this.addRule({ type: 'isHex' });
        return this;
    }

    /**
     * Checks if string is a hexadecimal color.
     * @remarks Chainable method.
     * ```ts
     * Rules:
     * - Starts with hastag (#) and is followed by 3 or 6 digits.
     * - Not case sensitive.
     * ```
     * @param digits - {@link THREE_DIGITS_HEX_COLOR_PATTERN | '3'} | {@link SIX_DIGITS_HEX_COLOR_PATTERN | '6'}.
     * @example #000000, #FFFFFF, #000, #fff
     */
    public isHexColor(digits?: HexColorDigits): this {
        this.addRule({ type: 'isHexColor', digits: digits });
        return this;
    }

    /**
     * Checks if string is in an array of allowed string values.
     * @remarks Chainable method.
     * ```ts
     * Rule:
     * - Case sensitive.
     * ```
     * @param value - An array of allowed string values.
     */
    public isIn(value: string[]): this {
        this.addRule({ type: 'isIn', value: value });
        return this;
    }

    /**
     * Checks if string is an IP address.
     * @remarks Chainable method.
     * ```ts
     * Rules:
     *
     * IP address v6 pattern matching:
     * - IPv6 addresses.
     * - Zero compressed IPv6 addresses (section 2.2 of rfc5952).
     * - Link-local IPv6 addresses with zone index (section 11 of rfc4007).
     * - IPv4-Embedded IPv6 address (section 2 of rfc6052).
     * - IPv4-mapped IPv6 addresses (section 2.1 of rfc2765).
     * - IPv4-translated addresses (section 2.1 of rfc2765).
     * ```
     * @param version - {@link IPV4_PATTERN | '4'} | {@link IPV6_PATTERN | '6'}.
     * @example IP address v4: 192.168.0.1
     * @example IP address v6: fde5:a773:d01a:0b6d
     */
    public isIpAddress(version?: IpVersion): this {
        this.addRule({ type: 'isIpAddress', version: version });
        return this;
    }

    /**
     * Checks if string is an ISO 3166-1 alpha country code.
     * @remarks Chainable method.
     * ```ts
     * Rule:
     * - Uppercase.
     * ```
     * @param version - {@link Iso3166Part1Alpha2Enum | '2'} | {@link Iso3166Part1Alpha3Enum | '3'}.
     * @see {@link https://en.wikipedia.org/wiki/ISO_3166-1}
     * @see {@link http://inmyownterms.com/take-note-languages-codes-versus-country-codes/} for syntax.
     * @example ISO 3166-1 alpha-2: DE, FR
     * @example ISO 3166-1 alpha-3: DEU, FRA
     */
    public isIso3166Part1Alpha(version?: AlphaVersion): this {
        this.addRule({ type: 'isIso3166Part1Alpha', version: version });
        return this;
    }

    /**
     * Checks if string is an ISO 4217 alpha-3 currency code representing:
     * - National currencies.
     * - X currencies (precious metals, supranational currencies, etc.)
     * @remarks Chainable method.
     * ```ts
     * Rule:
     * - Uppercase.
     * ```
     * @see {@link Iso4217Alpha3Enum | List of active ISO 4217 alpha-3 currency codes}
     * @see {@link https://en.wikipedia.org/wiki/ISO_4217}
     * @example EUR, USD, CHF, XAU
     */
    public isIso4217Alpha3(): this {
        this.addRule({ type: 'isIso4217Alpha3' });
        return this;
    }

    /**
     * Checks if string is an ISO 639-1 alpha-2 language code.
     * @remarks Chainable method.
     * ```ts
     * Rule:
     * - Lowercase.
     * ```
     * @see {@link Iso639Part1Alpha2Enum | List of 184 ISO 639-1 alpha-2 language codes}
     * @see {@link https://en.wikipedia.org/wiki/ISO_639-1}
     * @example en, es, fr
     */
    public isIso639Part1Alpha2(): this {
        this.addRule({ type: 'isIso639Part1Alpha2' });
        return this;
    }

    /**
     * Checks if string is an ISO 639-2 alpha-3 (bibliographic version) language code.
     * @remarks Chainable method.
     * ```ts
     * Rule:
     * - Lowercase.
     * ```
     * @see {@link Iso639Part2Alpha3Enum | List of 487 ISO 639-2 alpha-3 language codes}
     * @see {@link https://en.wikipedia.org/wiki/ISO_639-2}
     * @example eng, spa, fre
     */
    public isIso639Part2Alpha3(): this {
        this.addRule({ type: 'isIso639Part2Alpha3' });
        return this;
    }

    /**
     * Checks if string is a valid JSON string.
     *
     * A JSON string can describe the following sorts of JavaScript values: array, object, or string.
     * @remarks Chainable method.
     * @param format - 'array' | 'object' | 'string'
     * ```ts
     * format:
     * - array: Stringified JSON Array is surrounded by square brackets '[]'.
     * - object: Stringified JSON Object is surrounded by curly braces '{}', and is written in key/value pairs.
     * - string: Stringified JSON String, not empty.
     * ```
     * @see {@link https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse} for JSON.parse() returned values.
     * @see {@link https://www.w3schools.com/js/js_json_objects.asp} for JSON Objects details.
     * @see {@link https://matthewaisthorpe.com.au/json-object-vs-json-array/} for JSON Object and Array explanations.
     * @example Stringified JSON Array: '["value"]'
     * @example Stringified JSON Object: '{"object":"value"}'
     * @example Stringified JSON String: '"foo"'
     */
    public isJson(format?: JsonFormat): this {
        this.addRule({ type: 'isJson', format });
        return this;
    }

    /**
     * Checks if string is a latitude-longitude geographic coordinate.
     * @remarks Chainable method.
     * ```ts
     * Rules:
     * - Latitude comes before longitude.
     * - Latitude is followed by a comma (',' or ', ' tolerated).
     * ```
     * @param format - Degrees Minutes Seconds (DMS),  Degrees Minutes (DM), Decimal Degrees minutes (DM).
     * @see {@link isLatitude} for latitude formats and rules.
     * @see {@link isLongitude} for longitude formats and rules.
     * @example DMS: 49° 30′ 30″ N, 49° 30′ 30″ S, 144° 57′ 48″ E, 144° 57′ 48″ W
     * @example DM: 49° 30.5051′ N, 144° 57.8022′ E
     * @example DD: 49.508418°, 144.963375°
     */
    public isLatLong(format?: GeoCoordinatesFormat): this {
        this.addRule({ type: 'isLatLong', format: format });
        return this;
    }

    /**
     * Checks if string is a latitude geographic coordinate.
     * @remarks Chainable method.
     * ```ts
     * Rules:
     * - DMS fractional part max lenght is 4.
     * - DM fractional part max lenght is 4.
     * - DD fractional part max lenght is 6.
     * ```
     * @param format - {@link DMS_LAT_PATTERN | Degrees Minutes Seconds (DMS)}, {@link DM_LAT_PATTERN | Degrees Minutes (DM)}, {@link DM_LAT_PATTERN | Decimal Degrees minutes (DM)}.
     * ```ts
     * format:
     * - DMS: Traditional format for geographic coordinates using a sexagesimal system (base-60), first used by ancient Sumerians in the 3rd millennium BC. In higher accuracy map-ping situations, the “partial” second can be expressed as a decimal. For example, 49° 30′ 30.3033″ N is still in the DMS format.
     * - DM: If the decimal immediately follows the minutes coordinate (49° 30.5051′) then it’s DM.
     * - DD: Most appreciated computer format for geographic coordinates using the base-10 number system.
     * ```
     * @see {@link https://gsp.humboldt.edu/olm/Lessons/GIS/01%20SphericalCoordinates/Reporting_Geographic_Coordinates.html} for DMS and DD details.
     * @see {@link https://www.pgc.umn.edu/apps/convert/} for online converter.
     * @example DMS: 49° 30′ 30″ N, 49° 30′ 30″ S, 49° 30′ 30.3033″ N, 9° 30′ 30.3033″ N, 09° 30′ 30.3033″ N
     * @example DM: 49° 30.5051′ N, 49° 30.5051′ S, 9° 30.5051′ S, 09° 30.5051′ S
     * @example DD: 49.508418°, -49°, 9°, 09°
     */
    public isLatitude(format?: GeoCoordinatesFormat): this {
        this.addRule({ type: 'isLatitude', format: format });
        return this;
    }

    /**
     * Checks if string is a longitude geographic coordinate.
     * @remarks Chainable method.
     * ```ts
     *  Rules:
     * - DMS fractional part max lenght is 4.
     * - DM fractional part max lenght is 4.
     * - DD fractional part max lenght is 6.
     * ```
     * @param format - {@link DMS_LONG_PATTERN | Degrees Minutes Seconds (DMS)}, {@link DM_LONG_PATTERN | Degrees Minutes (DM)}, {@link DM_LONG_PATTERN | Decimal Degrees minutes (DM)}.
     * ```ts
     * format:
     * - DMS: Traditional format for geographic coordinates using a sexagesimal system (base-60), first used by ancient Sumerians in the 3rd millennium BC. In higher accuracy map-ping situations, the “partial” second can be expressed as a decimal. For example, 49° 30′ 30.3033″ N is still in the DMS format.
     * - DM: If the decimal immediately follows the minutes coordinate (49° 30.5051′) then it’s DM.
     * - DD: Most appreciated computer format for geographic coordinates using the base-10 number system.
     * ```
     * @see {@link https://gsp.humboldt.edu/olm/Lessons/GIS/01%20SphericalCoordinates/Reporting_Geographic_Coordinates.html} for DMS and DD details.
     * @see {@link https://www.pgc.umn.edu/apps/convert/} for online converter.
     * @example DMS: 144° 57′ 48″ E, 144° 57′ 48″ W, 144° 57′ 48.1321″ E, 44° 57′ 48.1321″ E, 4° 57′ 48.1321″ E, 004° 57′ 48.1321″ E
     * @example DM: 144° 57.8022′ E, 144° 57.8022′ W, 44° 57.8022′ W, 4° 57.8022′ W, 004° 57.8022′ W
     * @example DD: 144.963375°, -144°, 44°, 4°, 004°
     */
    public isLongitude(format?: GeoCoordinatesFormat): this {
        this.addRule({ type: 'isLongitude', format: format });
        return this;
    }

    /**
     * Checks if string does not contain any uppercase alpha characters.
     * @remarks Chainable method.
     * ```ts
     * Rule:
     * - Empty string allowed.
     * ```
     */
    public isLowerCase(): this {
        this.addRule({ type: 'isLowerCase' });
        return this;
    }

    /**
     * Checks if string is a MAC address.
     * @remarks Chainable method.
     * ```ts
     * Rules:
     * - 12 hex degits (6 groups of 2 digits).
     * - IEEE802-types definition: dash separator, uppercase.
     * - IETF-yang-types definition: colon separator, lowercase.
     * ```
     * @see {@link https://www.ieee802.org/1/files/public/docs2020/yangsters-smansfield-mac-address-format-0420-v01.pdf} for syntax.
     * @example IEEE802-types definition: 00-0A-95-9D-68-16
     * @example IETF-yang-types definition: 00:0a:95:9d:68:16
     */
    public isMacAddress(): this {
        this.addRule({ type: 'isMacAddress' });
        return this;
    }

    /**
     * Checks if string is not empty.
     * @remarks Chainable method.
     * ```ts
     * Rule:
     * - Not equals "".
     * ```
     */
    public isNotEmpty(): this {
        this.addRule({ type: 'isNotEmpty' });
        return this;
    }

    /**
     * Checks if string only contains numbers.
     * @remarks Chainable method.
     */
    public isNumeric(): this {
        this.addRule({ type: 'isNumeric' });
        return this;
    }

    /**
     * Checks if string is a representation of a MongoDB ObjectId.
     * @remarks Chainable method.
     * ```ts
     * Rules:
     * - 24 hex digits.
     * - Not case sensitive.
     * ```
     * @example 507f1f77bcf86cd799439011, 507F1F77BCF86CD799439011
     */
    public isObjectId(): this {
        this.addRule({ type: 'isObjectId' });
        return this;
    }

    /**
     * Checks if string is an octal number (base-8).
     * @remarks Chainable method.
     * ```ts
     * Rule:
     * - ECMAScript 2015 introduces OctalIntegerLiteral, prefixed with 0o or 0O (not supported by old browsers).
     * ```
     * @example 1, 7, 10, 010, 0o10, 0O10
     */
    public isOctal(): this {
        this.addRule({ type: 'isOctal' });
        return this;
    }

    /**
     * Checks if string follows one of the most popular programming naming convention.
     * @remarks Chainable method.
     * ```ts
     * Rule:
     * - Empty string allowed.
     * ```
     * @param convention - {@link PASCAL_CASE_PATTERN | 'PascalCase'} | {@link CAMEL_CASE_PATTERN | 'camelCase'} | {@link QUIET_SNAKE_CASE_PATTERN | 'quiet_snake_case'}
     * | {@link SCREAMING_SNAKE_CASE_PATTERN | 'SCREAMING_SNAKE_CASE'} | {@link KEBAB_CASE_PATTERN | 'kebab-case'} | {@link DOT_CASE_PATTERN | 'dot.case'}
     * @see {@link https://capitalizemytitle.com/camel-case/} for camelCase, PascalCase, snake_case conversion examples.
     * @see {@link https://medium.com/bendcosta/famous-camelcase-vs-kebab-case-javascript-6415cac2052b} for explanations.
     * @see {@link https://wprock.fr/blog/conventions-nommage-programmation/#conventions-le-camel-case} for french explanations.
     */
    public isProgrammingCase(convention: ProgrammingConvention): this {
        this.addRule({ type: 'isProgrammingCase', convention });
        return this;
    }

    /**
     * Checks if string does not contain any leading and trailing whitespace.
     * @remarks Chainable method.
     * @param side - 'both' | 'left' | 'right'
     */
    public isTrimmed(side: TrimmedSide): this {
        this.addRule({ type: 'isTrimmed', side });
        return this;
    }

    /**
     * Checks if string does not contain any lowercase alpha characters.
     * @remarks Chainable method.
     * ```ts
     * Rule:
     * - Empty string allowed.
     * ```
     */
    public isUpperCase(): this {
        this.addRule({ type: 'isUpperCase' });
        return this;
    }

    /**
     * Checks if string is an Universally unique identifier v4.
     * @remarks Chainable method.
     * ```ts
     * Rule:
     * - Lowercase.
     * ```
     * @see {@link https://tools.ietf.org/html/rfc4122#section-3} for syntax.
     * @example 9ad086df-061d-490c-8224-7e8ac292eeaf
     */
    public isUuidv4(): this {
        this.addRule({ type: 'isUuidv4' });
        return this;
    }

    /**
     * Checks if string matches the specified regex.
     * @remarks Chainable method.
     * @param value - The RegExp pattern.
     */
    public matches(value: RegExp): this {
        this.addRule({ type: 'matches', value: value });
        return this;
    }

    /**
     * Checks if string does not contain the specified substring.
     * @remarks Chainable method.
     * ```ts
     * Rule:
     * - Case sensitive.
     * ```
     * @param value
     */
    public notContains(value: string): this {
        this.addRule({ type: 'notContains', value: value });
        return this;
    }

    /**
     * Checks if two string are not equals.
     * @remarks Chainable method.
     * @param value
     */
    public notEquals(value: string): this {
        this.addRule({ type: 'notEquals', value: value });
        return this;
    }

    /**
     * @override
     * @param rule
     * @param value
     */
    protected checkRule(rule: StringRule, value: string): GuardResult {
        switch (rule.type) {
            case 'contains':
                return new StringContains(rule, value).exec();
            case 'equals':
                return new StringEquals(rule, value).exec();
            case 'hasLength':
                return new StringHasLength(rule, value).exec();
            case 'hasMaxLength':
                return new StringHasMaxLength(rule, value).exec();
            case 'hasMinLength':
                return new StringHasMinLength(rule, value).exec();
            case 'isAlpha':
                return new StringIsAlpha(rule, value).exec();
            case 'isAlphaNumeric':
                return new StringIsAlphaNumeric(rule, value).exec();
            case 'isAscii':
                return new StringIsAscii(rule, value).exec();
            case 'isBase64':
                return new StringIsBase64(rule, value).exec();
            case 'isBinary':
                return new StringIsBinary(rule, value).exec();
            case 'isCapitalized':
                return new StringIsCapitalized(rule, value).exec();
            case 'isDecimal':
                return new StringIsDecimal(rule, value).exec();
            case 'isEmailAddress':
                return new StringIsEmailAddress(rule, value).exec();
            case 'isEmpty':
                return new StringIsEmpty(rule, value).exec();
            case 'isHex':
                return new StringIsHex(rule, value).exec();
            case 'isHexColor':
                return new StringIsHexColor(rule, value).exec();
            case 'isIn':
                return new StringIsIn(rule, value).exec();
            case 'isIpAddress':
                return new StringIsIpAddress(rule, value).exec();
            case 'isIso3166Part1Alpha':
                return new StringIsIso3166Part1Alpha(rule, value).exec();
            case 'isIso4217Alpha3':
                return new StringIsIso4217Alpha3(rule, value).exec();
            case 'isIso639Part1Alpha2':
                return new StringIsIso639Part1Alpha2(rule, value).exec();
            case 'isIso639Part2Alpha3':
                return new StringIsIso639Part2Alpha3(rule, value).exec();
            case 'isJson':
                return new StringIsJson(rule, value).exec();
            case 'isLatLong':
                return new StringIsLatLong(rule, value).exec();
            case 'isLatitude':
                return new StringIsLatitude(rule, value).exec();
            case 'isLongitude':
                return new StringIsLongitude(rule, value).exec();
            case 'isLowerCase':
                return new StringIsLowercase(rule, value).exec();
            case 'isMacAddress':
                return new StringIsMacAddress(rule, value).exec();
            case 'isNotEmpty':
                return new StringIsNotEmpty(rule, value).exec();
            case 'isNumeric':
                return new StringIsNumeric(rule, value).exec();
            case 'isObjectId':
                return new StringIsObjectId(rule, value).exec();
            case 'isOctal':
                return new StringIsOctal(rule, value).exec();
            case 'isProgrammingCase':
                return new StringIsProgrammingCase(rule, value).exec();
            case 'isTrimmed':
                return new StringIsTrimmed(rule, value).exec();
            case 'isUpperCase':
                return new StringIsUppercase(rule, value).exec();
            case 'isUuidv4':
                return new StringIsUuidv4(rule, value).exec();
            case 'matches':
                return new StringMatches(rule, value).exec();
            case 'notContains':
                return new StringNotContains(rule, value).exec();
            case 'notEquals':
                return new StringNotEquals(rule, value).exec();
        }
    }

    /**
     * @override
     */
    protected typeGuard(): void {
        if (this.propertyValue === undefined || this.propertyValue === null) {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(
                `${this.constructor.name} expected a string but received: ${this.propertyValue}`
            );
        } else if (typeof this.propertyValue !== 'string') {
            this.getCombinedGuardResult().setSuccess(false);
            this.getCombinedGuardResult().setMessage(
                `${this.constructor.name} expected a string but received: ${typeof this.propertyValue}`
            );
        }
    }
}
