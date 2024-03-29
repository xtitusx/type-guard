import { StringRuleChecker } from './string-rule-checker';
import { GeoCoordinatesFormat } from './string-types';

import { GuardResult } from '../../core/guard-result';

const POLE_DMS_LAT_PATTERN = '^90[\u{00B0}][ ]00[\u{2032}][ ]00([.]0{1,4})?[\u{2033}][ ](N|S)$';
const POLE_DM_LAT_PATTERN = '^90[\u{00B0}][ ]00([.]0{1,4})?[\u{2032}][ ](N|S)$';
const POLE_DD_LAT_PATTERN = '^[-]?90([.]0{1,6})?[\u{00B0}]$';

/**
 * DMS latitude pattern:
 * - Unsigned degrees value.
 * - Degrees are within range 0 to 90.
 * - When degrees are less than ten, leading zero can be shown.
 * - Minutes and seconds are withing range 0 to 59 (sexagesimal system).
 * - When minutes and seconds are less than ten, leading zeroes must be shown.
 * - The “partial” second can be expressed as a decimal, fractional part max lenght is 4 digits.
 * - Degrees, minutes and seconds must be followed by the symbols ° (U+00B0), ′ (U+2032), and ″ (U+2033), without spaces between the number and symbol.
 * - North and south latitudes must be indicated by a cardinal compass point (N and S), following immediately after the digits.
 * - Degrees, minutes, seconds, and cardinal compass point are each separated by a whitespace.
 */
export const DMS_LAT_PATTERN = `${POLE_DMS_LAT_PATTERN}|^[0-8]?[0-9][\u{00B0}][ ][0-5][0-9][\u{2032}][ ][0-5][0-9]([.][0-9]{1,4})?[\u{2033}][ ](N|S)$`;

/**
 * DM latitude pattern:
 * - Unsigned degrees value.
 * - Degrees are within range 0 to 90.
 * - When degrees are less than ten, leading zero can be shown.
 * - Minutes are withing range 0 to 59 (sexagesimal system).
 * - When minutes are less than ten, leading zeroes must be shown.
 * - The “partial” minute can be expressed as a decimal, fractional part max lenght is 4 digits.
 * - Degrees, and minutes must be followed by the symbols ° (U+00B0), and ′ (U+2032), without spaces between the number and symbol.
 * - North and south latitudes must be indicated by a cardinal compass point (N and S), following immediately after the digits.
 * - Degrees, minutes, and cardinal compass point are each separated by a whitespace.
 */
export const DM_LAT_PATTERN = `${POLE_DM_LAT_PATTERN}|^[0-8]?[0-9][\u{00B0}][ ][0-5][0-9]([.][0-9]{1,4})?[\u{2032}][ ](N|S)$`;

/**
 * DM latitude pattern:
 * - Signed degrees value when negative.
 * - Degrees are within range -90 to 90.
 * - When degrees are less than ten, leading zero can be shown.
 * - The “partial” minute and second can be expressed as a decimal, fractional part max lenght is 6 digits.
 * - Degrees must be followed by the symbols ° (U+00B0), without spaces between the number and symbol.
 */
export const DD_LAT_PATTERN = `${POLE_DD_LAT_PATTERN}|^[-]?[0-8]?[0-9]([.][0-9]{1,6})?[\u{00B0}]$`;

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
                              `string is expected to be a DMS latitude geographic coordinate but is not: ${this.value}`
                          )
                          .build();
            case 'DM':
                return this.isDMLatitude()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be a DM latitude geographic coordinate but is not: ${this.value}`
                          )
                          .build();
            case 'DD':
                return this.isDDLatitude()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be a DD latitude geographic coordinate but is not: ${this.value}`
                          )
                          .build();
            default:
                return this.isDMSLatitude() || this.isDMLatitude() || this.isDDLatitude()
                    ? new GuardResult.Builder().withSuccess(true).build()
                    : new GuardResult.Builder()
                          .withSuccess(false)
                          .withMessage(
                              `string is expected to be a DMS, DM, or DD latitude geographic coordinate but is not: ${this.value}`
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

    private isDDLatitude(): boolean {
        return this.value.match(new RegExp(DD_LAT_PATTERN)) !== null;
    }
}
