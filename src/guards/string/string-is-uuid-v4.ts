import { StringRuleChecker } from './string-rule-checker';

import { GuardResult } from '../../core/guard-result';

/**
 * Uuidv4 pattern:
 * - Lowercase.
 * @see {@link https://tools.ietf.org/html/rfc4122#section-3}
 */
export const UUIDV4_PATTERN = '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$';

export class StringIsUuidv4 extends StringRuleChecker<{ type: 'isUuidv4' }> {
    constructor(rule: { type: 'isUuidv4' }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        return this.value.match(new RegExp(UUIDV4_PATTERN)) !== null
            ? new GuardResult.Builder().withSuccess(true).build()
            : new GuardResult.Builder()
                  .withSuccess(false)
                  .withMessage(`string is expected to be an Uuid v4 but is not: ${this.value}`)
                  .build();
    }
}
