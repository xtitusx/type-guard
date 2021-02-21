export class NumberUtils {
    /**
     * A prime number (or a prime) is a natural number greater than 1 that is not a product of two smaller natural numbers.
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
     * n is a Fibonacci number if n is equal or greater than zero, and of the following conditions is fulfilled:
     * - 5n²+4 is a perfect square.
     * - 5n²-4 is a perfect square.
     */
    public static isFibonacci(value: number): boolean {
        return value < 0
            ? false
            : NumberUtils.isPerfectSquare(5 * Math.pow(value, 2) + 4) ||
                  NumberUtils.isPerfectSquare(5 * Math.pow(value, 2) - 4);
    }

    /**
     * n is a NegaFibonacci number if one of the following conditions is fulfilled:
     * - 5n²+4 is a perfect square.
     * - 5n²-4 is a perfect square.
     */
    public static isNegaFibonacci(value: number): boolean {
        return (
            NumberUtils.isPerfectSquare(5 * Math.pow(value, 2) + 4) ||
            NumberUtils.isPerfectSquare(5 * Math.pow(value, 2) - 4)
        );
    }

    /**
     * Perfect squares are the squares of the whole numbers: 1, 4, 9, 16, 25, 36, 49...
     */
    public static isPerfectSquare(value: number): boolean {
        const sq = Math.sqrt(value);

        return sq - Math.floor(sq) === 0;
    }
}
