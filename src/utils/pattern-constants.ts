/**
 * Leading whitespace pattern.
 */
export const LEADING_WHITESPACE_PATTERN = '^\\s';

/**
 * Trailing whitespace pattern.
 */
export const TRAILING_WHITESPACE_PATTERN = '\\s$';

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
 * Decimal pattern.
 */
export const DECIMAL_PATTERN = '^[-]?\\d+(([.,]{1}\\d+)|(\\d*))$';

/**
 * Email address pattern matching 99% of email addresses.
 */
// prettier-ignore
export const QUICK_EMAIL_ADDRESS_PATTERN = '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$';

/**
 * RFC5322 email address pattern.
 * @see {@link https://en.wikipedia.org/wiki/Email_address#Syntax }
 */

/**
 * Email address pattern matching 99.9% of email addresses.
 *
 * Lightened RFC 5322 implementation omitting :
 * - IP addresses.
 * - domain-specific addresses.
 * - the syntax using double quotes and square brackets.
 */
// prettier-ignore
export const RFC5322_EMAIL_ADDRESS_PATTERN = '^[a-zA-Z0-9!#$%&\'*+/=?^_\'{|}~-]+(?:[.][a-zA-Z0-9!#$%&\'*+/=?^_\'{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?[.])+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$';

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
 * @see {@link https://tools.ietf.org/html/rfc4122#section-3 }
 */
export const UUIDV4_PATTERN = '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$';

/**
 * MAC address pattern.
 * @see {@link https://www.ieee802.org/1/files/public/docs2020/yangsters-smansfield-mac-address-format-0420-v01.pdf }
 */
export const MAC_ADDRESS_PATTERN = '^((([0-9A-F]{2}-){5})|(([0-9a-f]{2}:){5}))[0-9a-f]{2}$';

/**
 * IP address v4 pattern.
 */
export const IPV4_PATTERN =
    '^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])[.]){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$';

/**
 * IP address v6 pattern matching:
 *  - IPv6 addresses.
 *  - Zero compressed IPv6 addresses (section 2.2 of rfc5952).
 *  - Link-local IPv6 addresses with zone index (section 11 of rfc4007).
 *  - IPv4-Embedded IPv6 Address (section 2 of rfc6052).
 *  - IPv4-mapped IPv6 addresses (section 2.1 of rfc2765).
 *  - IPv4-translated addresses (section 2.1 of rfc2765).
 */
export const IPV6_PATTERN =
    '^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])[.]){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])[.]){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$';
