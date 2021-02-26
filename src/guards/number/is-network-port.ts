import { NumberRuleChecker } from './number-rule-checker';

import { GuardResult } from '../../core/guard-result';
import { NetworkPortRange } from './types';

/**
 * @class IsNetworkPort
 */
export class IsNetworkPort extends NumberRuleChecker<{ type: 'isNetworkPort'; range?: NetworkPortRange }> {
    constructor(rule: { type: 'isNetworkPort'; range?: NetworkPortRange }, value: number) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        switch (this.rule.range) {
            case 'well-known':
                return Number.isInteger(this.value) && this.value >= 1 && this.value <= 1023
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `number is expected to be a well-known network port (1-1023) but is not: ${this.value}`
                          )
                          .build();
            case 'registered':
                return Number.isInteger(this.value) && this.value >= 1024 && this.value <= 49151
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `number is expected to be a registered network port (1024-49151) but is not: ${this.value}`
                          )
                          .build();
            case 'private':
                return Number.isInteger(this.value) && this.value >= 49152 && this.value <= 65535
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `number is expected to be a private network port (1024-49151) but is not: ${this.value}`
                          )
                          .build();
            default:
                return Number.isInteger(this.value) && this.value >= 1 && this.value <= 65535
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `number is expected to be a private network port (49152-65535) but is not: ${this.value}`
                          )
                          .build();
        }
    }
}
