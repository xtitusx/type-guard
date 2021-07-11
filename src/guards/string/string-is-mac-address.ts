import { StringRuleChecker } from './string-rule-checker';
import { MacAddressDefinition } from './string-types';

import { GuardResult } from '../../core/guard-result';

/**
 * IEEE MAC address pattern.
 */
export const IEEE_MAC_ADDRESS_PATTERN = '^[0-9A-F]{2}([-][0-9A-F]{2}){5}$';

/*
 * IETF MAC address pattern.
 */
export const IETF_MAC_ADDRESS_PATTERN = '^[0-9a-f]{2}([:][0-9a-f]{2}){5}$';

export class StringIsMacAddress extends StringRuleChecker<{ type: 'isMacAddress'; def?: MacAddressDefinition }> {
    constructor(rule: { type: 'isMacAddress'; def?: MacAddressDefinition }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        switch (this.rule.def) {
            case 'IEEE':
                return this.isIeeeMacAddress()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be a MAC address but is not: ${this.value}`)
                          .build();
            case 'IETF':
                return this.isIetfMacAddress()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be an IEEE MAC address but is not: ${this.value}`)
                          .build();
            default:
                return this.isMacAddress()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be an IETF MAC address but is not: ${this.value}`)
                          .build();
        }
    }

    private isIeeeMacAddress(): boolean {
        return this.value.match(new RegExp(IEEE_MAC_ADDRESS_PATTERN)) !== null;
    }

    private isIetfMacAddress(): boolean {
        return this.value.match(new RegExp(IETF_MAC_ADDRESS_PATTERN)) !== null;
    }

    private isMacAddress(): boolean {
        return this.isIeeeMacAddress() || this.isIetfMacAddress();
    }
}
