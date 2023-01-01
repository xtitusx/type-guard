import { StringRuleChecker } from './string-rule-checker';
import { UuidVersion } from './string-types';

import { GuardResult } from '../../core/guard-result';

/**
 * Uuidv1 pattern:
 * - Lowercase.
 * @see {@link https://www.sohamkamani.com/uuid-versions-explained/#v1--uniqueness}
 */
export const UUIDV1_PATTERN = '^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$';

/**
 * Uuidv4 pattern:
 * - Lowercase.
 * @see {@link https://www.sohamkamani.com/uuid-versions-explained/#v4--randomness}
 */
export const UUIDV4_PATTERN = '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$';

/**
 * Uuidv5 pattern:
 * - Lowercase.
 * @see {@link https://www.sohamkamani.com/uuid-versions-explained/#v5-non-random-uuids}
 */
export const UUIDV5_PATTERN = '^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$';

export class StringIsUuidv4 extends StringRuleChecker<{ type: 'isUuid'; version?: UuidVersion }> {
    constructor(rule: { type: 'isUuid'; version?: UuidVersion }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        switch (this.rule.version) {
            case 'v1':
                return this.isUuidV1()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be an Uuid v1 but is not: ${this.value}`)
                          .build();
            case 'v4':
                return this.isUuidV4()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be an Uuid v4 but is not: ${this.value}`)
                          .build();
            case 'v5':
                return this.isUuidV5()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be an Uuid v5 but is not: ${this.value}`)
                          .build();
            default:
                return this.isUuid()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(`string is expected to be an Uuid but is not: ${this.value}`)
                          .build();
        }
    }

    private isUuidV1(): boolean {
        return this.value.match(new RegExp(UUIDV1_PATTERN)) !== null;
    }

    private isUuidV4(): boolean {
        return this.value.match(new RegExp(UUIDV4_PATTERN)) !== null;
    }

    private isUuidV5(): boolean {
        return this.value.match(new RegExp(UUIDV5_PATTERN)) !== null;
    }

    private isUuid(): boolean {
        return this.isUuidV1() || this.isUuidV4() || this.isUuidV5();
    }
}
