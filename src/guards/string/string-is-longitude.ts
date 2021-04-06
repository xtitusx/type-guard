import { StringRuleChecker } from './string-rule-checker';
import { GeoCoordinatesFormat } from './string-types';

import { GuardResult } from '../../core/guard-result';

const ANTIMERIDIAN_DMS_LONG_PATTERN = '^180[\u{00B0}][ ]00[\u{2032}][ ]00([.]0{1,4})?[\u{2033}][ ](E|W)$';
const ANTIMERIDIAN_DM_LONG_PATTERN = '^180[\u{00B0}][ ]00([.]0{1,4})?[\u{2032}][ ](E|W)$';
const ANTIMERIDIAN_DD_LONG_PATTERN = '^[-]?180([.]0{1,6})?[\u{00B0}]$';

/**
 * DMS longitude pattern:
 * - Unsigned degrees value.
 * - Degrees are within range 0 to 180.
 * - When degrees are less than hundred, leading zeroes can be shown.
 * - Minutes and seconds are withing range 0 to 59 (sexagesimal system).
 * - When minutes and seconds are less than ten, leading zeroes must be shown.
 * - The “partial” second can be expressed as a decimal, fractional part max lenght is 4 digits.
 * - Degrees, minutes and seconds must be followed by the symbols ° (U+00B0), ′ (U+2032), and ″ (U+2033), without spaces between the number and symbol.
 * - East and west longitudes must be indicated by a cardinal compass point (E and W), following immediately after the digits.
 * - Degrees, minutes, seconds, and cardinal compass point are each separated by a whitespace.
 */
export const DMS_LONG_PATTERN = `${ANTIMERIDIAN_DMS_LONG_PATTERN}|^(([0]?[0-9]?)|([1][0-7]))[0-9][\u{00B0}][ ][0-5][0-9][\u{2032}][ ][0-5][0-9]([.][0-9]{1,4})?[\u{2033}][ ](E|W)$`;

/**
 * DM longitude pattern:
 * - Unsigned degrees value.
 * - Degrees are within range 0 to 180.
 * - When degrees are less than hundred, leading zeroes can be shown.
 * - Minutes are withing range 0 to 59 (sexagesimal system).
 * - When minutes are less than ten, leading zeroes must be shown.
 * - The “partial” minute can be expressed as a decimal, fractional part max lenght is 4 digits.
 * - Degrees, and minutes must be followed by the symbols ° (U+00B0), and ′ (U+2032), without spaces between the number and symbol.
 * - East and west longitudes must be indicated by a cardinal compass point (E and W), following immediately after the digits.
 * - Degrees, minutes, and cardinal compass point are each separated by a whitespace.
 */
export const DM_LONG_PATTERN = `${ANTIMERIDIAN_DM_LONG_PATTERN}|^(([0]?[0-9]?)|([1][0-7]))[0-9][\u{00B0}][ ][0-5][0-9]([.][0-9]{1,4})?[\u{2032}][ ](E|W)$`;

/**
 * DM longitude pattern:
 * - Signed degrees value when negative.
 * - Degrees are within range -180 to 180.
 * - When degrees are less than hundred, leading zeroes can be shown.
 * - The “partial” minute and second can be expressed as a decimal, fractional part max lenght is 6 digits.
 * - Degrees must be followed by the symbols ° (U+00B0), without spaces between the number and symbol.
 */
export const DD_LONG_PATTERN = `${ANTIMERIDIAN_DD_LONG_PATTERN}|^[-]?(([0]?[0-9]?)|([1][0-7]))[0-9]([.][0-9]{1,6})?[\u{00B0}]$`;

export class StringIsLongitude extends StringRuleChecker<{ type: 'isLongitude'; format?: GeoCoordinatesFormat }> {
    constructor(rule: { type: 'isLongitude'; format?: GeoCoordinatesFormat }, value: string) {
        super(rule, value);
    }

    /**
     * @override
     */
    public exec(): GuardResult {
        switch (this.rule.format) {
            case 'DMS':
                return this.isDMSLongitude()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be a DMS longitude geographic coordinate. but is not: ${this.value}`
                          )
                          .build();
            case 'DM':
                return this.isDMLongitude()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be a DM longitude geographic coordinate. but is not: ${this.value}`
                          )
                          .build();
            case 'DD':
                return this.isDDLongitude()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be a DD longitude geographic coordinate. but is not: ${this.value}`
                          )
                          .build();
            default:
                return this.isDMSLongitude() || this.isDMLongitude() || this.isDDLongitude()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be a DMS, DM, or DD longitude geographic coordinate. but is not: ${this.value}`
                          )
                          .build();
        }
    }

    private isDMSLongitude(): boolean {
        return this.value.match(new RegExp(DMS_LONG_PATTERN)) !== null;
    }

    private isDMLongitude(): boolean {
        return this.value.match(new RegExp(DM_LONG_PATTERN)) !== null;
    }

    private isDDLongitude(): boolean {
        return this.value.match(new RegExp(DD_LONG_PATTERN)) !== null;
    }
}
