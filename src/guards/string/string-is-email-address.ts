import { StringRuleChecker } from './string-rule-checker';
import { EmailAddressDefinition } from './string-types';

import { GuardResult } from '../../core/guard-result';

/**
 * Email address pattern matching 99% of email addresses.
 */
// prettier-ignore
export const QUICK_EMAIL_ADDRESS_PATTERN = '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$';

/**
 * RFC5322 email address pattern matching 99.9% of email addresses.
 *
 * Lightened RFC 5322 implementation omitting:
 * - IP addresses.
 * - domain-specific addresses.
 * - the syntax using double quotes and square brackets.
 * @see {@link https://en.wikipedia.org/wiki/Email_address#Syntax}
 */
// prettier-ignore
export const RFC5322_EMAIL_ADDRESS_PATTERN = '^[a-zA-Z0-9!#$%&\'*+/=?^_\'{|}~-]+(?:[.][a-zA-Z0-9!#$%&\'*+/=?^_\'{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?[.])+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$';

export class StringIsEmailAddress extends StringRuleChecker<{ type: 'isEmailAddress'; def?: EmailAddressDefinition }> {
    constructor(rule: { type: 'isEmailAddress'; def?: EmailAddressDefinition }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        switch (this.rule.def) {
            case 'rfc5322':
                return this.isRfc5322()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to match email address lightened RFC5322 syntactic rules but does not: ${this.value}`
                          )
                          .build();
            case 'quick':
            default:
                return this.isQuick()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to match email address common syntactic rules but does not: ${this.value}`
                          )
                          .build();
        }
    }

    private isRfc5322(): boolean {
        return this.value.match(new RegExp(RFC5322_EMAIL_ADDRESS_PATTERN)) !== null;
    }

    private isQuick(): boolean {
        return this.value.match(new RegExp(QUICK_EMAIL_ADDRESS_PATTERN)) !== null;
    }
}
