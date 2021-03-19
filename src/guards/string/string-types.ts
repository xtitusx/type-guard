import { IIsDecimalOptions } from './string-options';

export type StringRule =
    | { type: 'equals'; value: string }
    | { type: 'notEquals'; value: string }
    | { type: 'contains'; value: string }
    | { type: 'notContains'; value: string }
    | { type: 'matches'; value: RegExp }
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
    | { type: 'isHex' }
    | { type: 'isDecimal'; options?: IIsDecimalOptions }
    | { type: 'isEmailAddress'; def?: EmailAddressDefinition }
    | { type: 'isObjectId' }
    | { type: 'isHexColor'; digits?: 3 | 6 }
    | { type: 'isUuidv4' }
    | { type: 'isMacAddress' }
    | { type: 'isIpAddress'; version?: 4 | 6 };

export type CapitalizationStyle = 'firstChar' | 'startCase';

export type ProgrammingConvention =
    | 'PascalCase'
    | 'camelCase'
    | 'quiet_snake_case'
    | 'SCREAMING_SNAKE_CASE'
    | 'kebab-case';

export type TrimmedSide = 'both' | 'left' | 'right';

export type EmailAddressDefinition = 'quick' | 'rfc5322';
