export interface IIsDecimalOptions {
    /**
     * Force string number to have a decimal separator.
     * @defaultValue false
     */
    force?: boolean;
    /**
     * Max number of digits to the right of the decimal separator in the string number.
     */
    precision?: number;
}
