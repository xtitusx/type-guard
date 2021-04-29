import { IIsDecimalOptions } from './string-options';

export type StringRule =
    | { type: 'equals'; value: string }
    | { type: 'notEquals'; value: string }
    | { type: 'contains'; value: string }
    | { type: 'notContains'; value: string }
    | { type: 'matches'; value: RegExp }
    | { type: 'isIn'; value: string[] }
    | { type: 'isEmpty' }
    | { type: 'isNotEmpty' }
    | { type: 'hasLength'; value: number }
    | { type: 'hasMinLength'; min: number }
    | { type: 'hasMaxLength'; max: number }
    | { type: 'isUpperCase' }
    | { type: 'isLowerCase' }
    | { type: 'isCapitalized'; style: CapitalizationStyle; checkFirstCharIsLetter?: boolean }
    | { type: 'isProgrammingCase'; convention: ProgrammingConvention }
    | { type: 'isTrimmed'; side: TrimmedSide }
    | { type: 'isAlphaNumeric' }
    | { type: 'isAlpha' }
    | { type: 'isNumeric' }
    | { type: 'isAscii' }
    | { type: 'isBinary' }
    | { type: 'isOctal' }
    | { type: 'isHex' }
    | { type: 'isBase64'; impl: Base64Implementation }
    | { type: 'isJson'; format?: JsonFormat }
    | { type: 'isDecimal'; options?: IIsDecimalOptions }
    | { type: 'isEmailAddress'; def?: EmailAddressDefinition }
    | { type: 'isObjectId' }
    | { type: 'isHexColor'; digits?: HexColorDigits }
    | { type: 'isUuidv4' }
    | { type: 'isMacAddress' }
    | { type: 'isIpAddress'; version?: IpVersion }
    | { type: 'isLatitude'; format?: GeoCoordinatesFormat }
    | { type: 'isLongitude'; format?: GeoCoordinatesFormat }
    | { type: 'isLatLong'; format?: GeoCoordinatesFormat }
    | { type: 'isIso639Part1Alpha2' }
    | { type: 'isIso639Part2Alpha3' }
    | { type: 'isIso3166Part1Alpha'; version?: AlphaVersion }
    | { type: 'isIso4217Alpha3' };

export type CapitalizationStyle = 'firstChar' | 'startCase';

export type ProgrammingConvention =
    | 'PascalCase'
    | 'camelCase'
    | 'quiet_snake_case'
    | 'SCREAMING_SNAKE_CASE'
    | 'kebab-case'
    | 'dot.case';

export type TrimmedSide = 'both' | 'left' | 'right';

export type Base64Implementation = 'standard' | 'fileName' | 'urlSafe';

export type JsonFormat = 'array' | 'object' | 'string';

export type EmailAddressDefinition = 'quick' | 'rfc5322';

export type HexColorDigits = '3' | '6';

export type IpVersion = '4' | '6';

export type GeoCoordinatesFormat = 'DMS' | 'DM' | 'DD';

export type AlphaVersion = '2' | '3';
