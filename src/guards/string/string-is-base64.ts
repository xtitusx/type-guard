import { StringRuleChecker } from './string-rule-checker';
import { Base64Implementation } from './string-types';

import { GuardResult } from '../../core/guard-result';

/**
 * Base64 standard pattern:
 * - Uppercase alpha characters A-Z.
 * - Lowercase alpha characters a-z.
 * - Number characters 0–9.
 * - Characters + and /.
 * - The = character is used for padding.
 */
export const BASE64_STANDARD_PATTERN =
    '^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$';

/**
 * Base64 file name pattern:
 * - Uppercase alpha characters A-Z.
 * - Lowercase alpha characters a-z.
 * - Number characters 0–9.
 * - Characters + and -.
 * - The = character is used for padding.
 */
export const BASE64_FILE_NAME_PATTERN =
    '^(?:[A-Za-z0-9+-]{4})*(?:[A-Za-z0-9+-]{2}==|[A-Za-z0-9+-]{3}=|[A-Za-z0-9+-]{4})$';
/**
 * Base64 url pattern:
 * - Uppercase alpha characters A-Z.
 * - Lowercase alpha characters a-z.
 * - Number characters 0–9.
 * - Characters - and _.
 * - No padding.
 */
export const BASE64_URL_SAFE_PATTERN = '^[A-Za-z0-9-_]+$';

export class StringIsBase64 extends StringRuleChecker<{ type: 'isBase64'; impl: Base64Implementation }> {
    constructor(rule: { type: 'isBase64'; impl: Base64Implementation }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        switch (this.rule.impl) {
            case 'standard':
                return this.isBase64Standard()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be Base64 encoded but is not: ${this.value}`)
                          .build();
            case 'fileName':
                return this.isBase64FileName()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be an encoded Base64 file name but is not: ${this.value}`)
                          .build();
            case 'urlSafe':
                return this.isBase64UrlSafe()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be an encoded Base64 safe url but is not: ${this.value}`)
                          .build();
        }
    }

    private isBase64Standard(): boolean {
        return this.value.match(new RegExp(BASE64_STANDARD_PATTERN)) !== null;
    }

    private isBase64FileName(): boolean {
        return this.value.match(new RegExp(BASE64_FILE_NAME_PATTERN)) !== null;
    }

    private isBase64UrlSafe(): boolean {
        return this.value.match(new RegExp(BASE64_URL_SAFE_PATTERN)) !== null;
    }
}
