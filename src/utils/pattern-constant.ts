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
 * Email address pattern.
 * @see https://en.wikipedia.org/wiki/Email_address#Syntax
 */
// prettier-ignore
export const EMAIL_ADDRESS_PATTERN = '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$';

/**
 * ObjectId pattern.
 */
export const OBJECTID_PATTERN = '^[a-fA-F\\d]{24}$';

/**
 * 3 digits hex color pattern.
 */
export const THREE_DIGITS_HEX_COLOR_PATTERN = '^#[0-9a-fA-F]{3}$';

/**
 * 6 digits hex color pattern.
 */
export const SIX_DIGITS_HEX_COLOR_PATTERN = '^#[0-9a-fA-F]{6}$';

/**
 * Uuidv4 pattern.
 * @see https://tools.ietf.org/html/rfc4122#section-3.
 */
export const UUIDV4_PATTERN = '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$';

/**
 * MAC address pattern.
 * @see https://www.ieee802.org/1/files/public/docs2020/yangsters-smansfield-mac-address-format-0420-v01.pdf
 */
export const MAC_ADDRESS_PATTERN = '^((([0-9A-F]{2}-){5})|(([0-9a-f]{2}:){5}))[0-9a-f]{2}$';
