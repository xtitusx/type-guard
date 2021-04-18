import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * ObjectId pattern:
 * - 24 hex digits.
 * - Not case sensitive.
 */
export const OBJECT_ID_PATTERN = '^[a-fA-F\\d]{24}$';

export class StringIsObjectId extends StringRuleChecker<{ type: 'isObjectId' }> {
    constructor(rule: { type: 'isObjectId' }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.isObjectId()
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to be an ObjectId but is not: ${this.value}`)
                  .build();
    }

    private isObjectId(): boolean {
        return this.value.match(new RegExp(OBJECT_ID_PATTERN)) !== null;
    }
}
