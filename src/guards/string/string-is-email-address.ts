import { StringRuleChecker } from './string-rule-checker';
import { EmailAddressDefinition } from './string-types';

import { GuardResult } from '../../core/guard-result';
import { RFC5322_EMAIL_ADDRESS_PATTERN, QUICK_EMAIL_ADDRESS_PATTERN } from '../../utils/pattern-constants';

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
                return this.value.match(new RegExp(RFC5322_EMAIL_ADDRESS_PATTERN)) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to match email address lightened RFC5322 syntactic rules but does not: ${this.value}`
                          )
                          .build();
            case 'quick':
            default:
                return this.value.match(new RegExp(QUICK_EMAIL_ADDRESS_PATTERN)) !== null
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to match email address common syntactic rules but does not: ${this.value}`
                          )
                          .build();
        }
    }
}
