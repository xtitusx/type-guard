export interface IIsDecimalOptions {
    /**
     * Force number string to have a decimal separator.
     * @defaultValue false
     */
    force?: boolean;
    /**
     * Max number of digits to the right of the decimal separator in the number string.
     */
    precision?: number;
}
