export interface IIsNumericOptions {
    /**
     * Force number to have a decimal point.
     * @defaultValue false
     */
    force?: boolean;
    /**
     * Max number of digits to the right of the decimal point in the number.
     */
    precision?: number;
}
