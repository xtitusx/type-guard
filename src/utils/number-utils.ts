/**
 * @class NumberUtils
 */
export class NumberUtils {
    /**
     * Checks if number is a prime number.
     * @remarks A prime number is a positive integer that is not a product of two smaller natural numbers.
     * @param value
     */
    public static isPrime(value: number): boolean {
        if (!Number.isInteger(value) || value < 2) {
            return false;
        }
        for (let whole = 2; whole < value; whole++) {
            if (value % whole === 0) {
                return false;
            }
        }

        return true;
    }

    /**
     * Checks if number is a composite number.
     * @remarks A composite number is a positive integer that can be formed by multiplying two smaller positive integers.
     * @param value
     */
    public static isComposite(value: number): boolean {
        if (!Number.isInteger(value) || value < 4) {
            return false;
        }
        for (let whole = 2; whole < value; whole++) {
            if (value % whole === 0) {
                return true;
            }
        }

        return false;
    }

    /**
     * Checks if number is a Fibonacci number.
     * @remarks n is a Fibonacci number if n is equal or greater than zero, and of the following conditions is fulfilled:
     * - 5n²+4 is a perfect square.
     * - 5n²-4 is a perfect square.
     * @param value
     */
    public static isFibonacci(value: number): boolean {
        return value < 0
            ? false
            : NumberUtils.isPerfectSquare(5 * Math.pow(value, 2) + 4) ||
                  NumberUtils.isPerfectSquare(5 * Math.pow(value, 2) - 4);
    }

    /**
     * Checks if number is a NegaFibonacci number.
     * @remarks n is a NegaFibonacci number if one of the following conditions is fulfilled:
     * - 5n²+4 is a perfect square.
     * - 5n²-4 is a perfect square.
     * @param value
     */
    public static isNegaFibonacci(value: number): boolean {
        return (
            NumberUtils.isPerfectSquare(5 * Math.pow(value, 2) + 4) ||
            NumberUtils.isPerfectSquare(5 * Math.pow(value, 2) - 4)
        );
    }

    /**
     * Checks if number is a perfect square.
     * @remarks Perfect squares are the squares of the whole numbers: 1, 4, 9, 16, 25, 36, 49...
     */
    public static isPerfectSquare(value: number): boolean {
        const sq = Math.sqrt(value);

        return sq - Math.floor(sq) === 0;
    }
}
