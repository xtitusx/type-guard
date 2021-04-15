import { StringRuleChecker } from './string-rule-checker';
import { JsonFormat } from './string-types';

import { GuardResult } from '../../core/guard-result';

export class StringIsJson extends StringRuleChecker<{ type: 'isJson'; format?: JsonFormat }> {
    constructor(rule: { type: 'isJson'; format?: JsonFormat }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        switch (this.rule.format) {
            case 'array':
                return this.isJsonArray()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be a valid stringified JSON Array but is not: ${this.value}`
                          )
                          .build();
            case 'object':
                return this.isJsonObject()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be a valid JSON Object string but is not: ${this.value}`)
                          .build();
            case 'string':
                return this.isJsonString()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be a valid stringified JSON String but is not: ${this.value}`
                          )
                          .build();
            default:
                return this.isJson()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be a valid stringified JSON but is not: ${this.value}`)
                          .build();
        }
    }

    private isJsonArray(): boolean {
        return this.isJson() && Array.isArray(JSON.parse(this.value));
    }

    private isJsonObject(): boolean {
        return this.isJson() && !this.isJsonArray() && typeof JSON.parse(this.value) === 'object';
    }

    private isJsonString(): boolean {
        return this.isJson() && typeof JSON.parse(this.value) === 'string';
    }

    private isJson(): boolean {
        try {
            JSON.parse(this.value);
            return true;
        } catch (err) {
            return false;
        }
    }
}
