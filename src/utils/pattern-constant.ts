/**
 * AlphaNumeric pattern.
 */
export const ALPHA_NUMERIC_PATTERN = '^[0-9a-zA-Z]+$';

/**
 * Numeric pattern.
 */
export const NUMERIC_PATTERN = '^[0-9]+$';

/**
 * Alpha pattern.
 */
export const ALPHA_PATTERN = '^[a-zA-Z]+$';

/**
 * Hex pattern.
 */
export const HEX_PATTERN = '^[a-fA-F\\d]+$';

/**
 * ObjectId pattern.
 */
export const OBJECTID_PATTERN = '^[a-fA-F\\d]{24}$';

/**
 * Email address pattern.
 * @see https://en.wikipedia.org/wiki/Email_address#Syntax
 */
// prettier-ignore
export const EMAIL_ADDRESS_PATTERN = '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$';
