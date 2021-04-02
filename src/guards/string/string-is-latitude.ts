import { StringRuleChecker } from './string-rule-checker';
import { GeoCoordinatesFormat } from './string-types';

import { GuardResult } from '../../core/guard-result';

/**
 * DMS latitude pattern:
 * - Unsigned degrees value.
 * - Degrees are within range 0 to 90.
 * - Minutes and seconds are withing range 0 to 59 (sexageximal system).
 * - When minutes and seconds are less than ten, leading zeroes must be shown.
 * - The “partial” second can be expressed as a decimal, fractional part max lenght is 4 digits.
 * - Degrees, minutes and seconds should be followed by the symbols ° (U+00B0), ′ (U+2032), and ″ (U+2033), without spaces between the number and symbol.
 * - North and south latitudes should be indicated by a cardinal compass point (N and S), following immediately after the digits.
 * - Degrees, minutes, seconds, and cardinal compass point are each separated by a whitespace.
 */
export const DMS_LAT_PATTERN =
    '^(([0-8][0-9])|90)[\u{00B0}][ ][0-5][0-9][\u{2032}][ ][0-5][0-9]([.][0-9]{1,4})?[\u{2033}][ ](N|S)$';

/**
 * DM latitude pattern:
 * - Unsigned degrees value.
 * - Degrees are within range 0 to 90.
 * - Minutes are withing range 0 to 59 (sexageximal system).
 * - When minutes are less than ten, leading zeroes must be shown.
 * - The “partial” minute can be expressed as a decimal, fractional part max lenght is 4 digits.
 * - Degrees, and minutes should be followed by the symbols ° (U+00B0), and ′ (U+2032), without spaces between the number and symbol.
 * - North and south latitudes should be indicated by a cardinal compass point (N and S), following immediately after the digits.
 * - Degrees, minutes, and cardinal compass point are each separated by a whitespace.
 */
export const DM_LAT_PATTERN = '^(([0-8][0-9])|90)[\u{00B0}][ ][0-5][0-9]([.][0-9]{1,4})?[\u{2032}][ ](N|S)$';

export class StringIsLatitude extends StringRuleChecker<{ type: 'isLatitude'; format?: GeoCoordinatesFormat }> {
    constructor(rule: { type: 'isLatitude'; format?: GeoCoordinatesFormat }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        switch (this.rule.format) {
            case 'DMS':
                return this.isDMSLatitude()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be a DMS latitude geographic coordinate. but is not: ${this.value}`
                          )
                          .build();
            case 'DM':
                return this.isDMLatitude()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be a DM latitude geographic coordinate. but is not: ${this.value}`
                          )
                          .build();
            default:
                return this.isDMSLatitude() || this.isDMLatitude()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be a DMS or DM latitude geographic coordinate. but is not: ${this.value}`
                          )
                          .build();
        }
    }

    private isDMSLatitude(): boolean {
        return this.value.match(new RegExp(DMS_LAT_PATTERN)) !== null;
    }

    private isDMLatitude(): boolean {
        return this.value.match(new RegExp(DM_LAT_PATTERN)) !== null;
    }
}
