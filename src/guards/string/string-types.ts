import { IIsDecimalOptions } from './string-options';

export type StringRule =
    | { type: 'contains'; value: string }
    | { type: 'equals'; value: string }
    | { type: 'hasLength'; value: number }
    | { type: 'hasMaxLength'; max: number }
    | { type: 'hasMinLength'; min: number }
    | { type: 'isAlpha'; alphabet?: Alphabet }
    | { type: 'isAlphaNumeric' }
    | { type: 'isAscii' }
    | { type: 'isBase64'; impl: Base64Implementation }
    | { type: 'isBinary' }
    | { type: 'isCapitalized'; style: CapitalizationStyle; checkFirstCharIsLetter?: boolean }
    | { type: 'isDecimal'; options?: IIsDecimalOptions }
    | { type: 'isEmailAddress'; def?: EmailAddressDefinition }
    | { type: 'isEmpty' }
    | { type: 'isHex' }
    | { type: 'isHexColor'; digits?: HexColorDigits }
    | { type: 'isIn'; values: string[] }
    | { type: 'isIpAddress'; version?: IpVersion }
    | { type: 'isIso3166Part1Alpha'; version?: Iso3166Part1AlphaVersion }
    | { type: 'isIso4217Alpha3' }
    | { type: 'isIso639Part1Alpha2' }
    | { type: 'isIso639Part2Alpha3'; set?: Iso639Part2Alpha3Set }
    | { type: 'isJson'; format?: JsonFormat }
    | { type: 'isLatLong'; format?: GeoCoordinatesFormat }
    | { type: 'isLatitude'; format?: GeoCoordinatesFormat }
    | { type: 'isLongitude'; format?: GeoCoordinatesFormat }
    | { type: 'isLowerCase' }
    | { type: 'isMacAddress'; def?: MacAddressDefinition }
    | { type: 'isNotEmpty' }
    | { type: 'isNotIn'; values: string[] }
    | { type: 'isNumeric' }
    | { type: 'isObjectId' }
    | { type: 'isOctal' }
    | { type: 'isProgrammingCase'; convention: ProgrammingConvention }
    | { type: 'isTrimmed'; side: TrimmedSide }
    | { type: 'isUpperCase' }
    | { type: 'isUuidv4' }
    | { type: 'matches'; value: RegExp }
    | { type: 'notContains'; value: string }
    | { type: 'notEquals'; value: string };

export type Alphabet =
    | 'basic-latin'
    | 'gajs-latin'
    | 'precomposed-latin'
    | 'dan'
    | 'deu'
    | 'est'
    | 'fin'
    | 'fra'
    | 'gle'
    | 'hun'
    | 'isl'
    | 'ita'
    | 'nld'
    | 'nor'
    | 'pol'
    | 'por'
    | 'spa'
    | 'swe';

export type Base64Implementation = 'standard' | 'fileName' | 'urlSafe';

export type CapitalizationStyle = 'firstChar' | 'startCase';

export type EmailAddressDefinition = 'quick' | 'rfc5322';

export type GeoCoordinatesFormat = 'DMS' | 'DM' | 'DD';

export type HexColorDigits = '3' | '6';

export type IpVersion = '4' | '6';

export type Iso3166Part1AlphaVersion = '2' | '3';

export type Iso639Part2Alpha3Set = 'bibliographic' | 'terminologic';

export type JsonFormat = 'array' | 'object' | 'string';

export type MacAddressDefinition = 'IEEE' | 'IETF';

export type ProgrammingConvention =
    | 'PascalCase'
    | 'camelCase'
    | 'quiet_snake_case'
    | 'SCREAMING_SNAKE_CASE'
    | 'kebab-case'
    | 'dot.case';

export type TrimmedSide = 'both' | 'left' | 'right';
