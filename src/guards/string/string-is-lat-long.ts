import { StringRuleChecker } from './string-rule-checker';
import { GeoCoordinatesFormat } from './string-types';

import { GuardResult } from '../../core/guard-result';
import { Tyr } from '../../tyr';

const LAT_LONG_SEPARATOR = ',';
const LAT_LONG_SEPARATOR_PATTERN = `[${LAT_LONG_SEPARATOR}][ ]?`;

export class StringIsLatLong extends StringRuleChecker<{ type: 'isLatLong'; format?: GeoCoordinatesFormat }> {
    constructor(rule: { type: 'isLatLong'; format?: GeoCoordinatesFormat }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        switch (this.rule.format) {
            case 'DMS':
                return this.isLatLong('DMS')
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be a DMS latitude-longitude geographic coordinate. but is not: ${this.value}`
                          )
                          .build();
            case 'DM':
                return this.isLatLong('DM')
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be a DM latitude-longitude geographic coordinate. but is not: ${this.value}`
                          )
                          .build();
            case 'DD':
                return this.isLatLong('DD')
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be a DD latitude-longitude geographic coordinate. but is not: ${this.value}`
                          )
                          .build();
            default:
                return this.isLatLong()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be a DMS, DM, or DD latitude-longitude geographic coordinate. but is not: ${this.value}`
                          )
                          .build();
        }
    }

    private hasSeparator(): boolean {
        return this.value.includes(LAT_LONG_SEPARATOR);
    }

    private isLatLong(format?: GeoCoordinatesFormat): boolean {
        return (
            this.hasSeparator() &&
            Tyr.string()
                .isLatitude(format)
                .guard(this.value.split(new RegExp(LAT_LONG_SEPARATOR_PATTERN))[0])
                .isSuccess() &&
            Tyr.string()
                .isLongitude(format)
                .guard(this.value.split(new RegExp(LAT_LONG_SEPARATOR_PATTERN))[1])
                .isSuccess()
        );
    }
}
