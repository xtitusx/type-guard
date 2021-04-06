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
    | { type: 'isBinary' }
    | { type: 'isOctal' }
    | { type: 'isHex' }
    | { type: 'isDecimal'; options?: IIsDecimalOptions }
    | { type: 'isEmailAddress'; def?: EmailAddressDefinition }
    | { type: 'isObjectId' }
    | { type: 'isHexColor'; digits?: HExColorDigits }
    | { type: 'isUuidv4' }
    | { type: 'isMacAddress' }
    | { type: 'isIpAddress'; version?: IpVersion }
    | { type: 'isLatitude'; format?: GeoCoordinatesFormat }
    | { type: 'isLongitude'; format?: GeoCoordinatesFormat }
    | { type: 'isIso31661Alpha'; version?: AlphaVersion };

export type CapitalizationStyle = 'firstChar' | 'startCase';

export type ProgrammingConvention =
    | 'PascalCase'
    | 'camelCase'
    | 'quiet_snake_case'
    | 'SCREAMING_SNAKE_CASE'
    | 'kebab-case'
    | 'dot.case';

export type TrimmedSide = 'both' | 'left' | 'right';

export type HExColorDigits = '3' | '6';

export type IpVersion = '4' | '6';

export type GeoCoordinatesFormat = 'DMS' | 'DM' | 'DD';

export type AlphaVersion = '2' | '3';

export type EmailAddressDefinition = 'quick' | 'rfc5322';
