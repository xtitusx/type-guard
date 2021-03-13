import { ArrayGuard } from './guards/array-guard';
import { BooleanGuard } from './guards/boolean-guard';
import { ClassGuard } from './guards/class-guard';
import { DateStringGuard } from './guards/date-string-guard';
import { NilGuard } from './guards/nil-guard';
import { NumberGuard } from './guards/number-guard';
import { StringGuard } from './guards/string-guard';

export class TypeGuard {
    /**
     * @returns A new instance of ArrayGuard.
     */
    public static array(): ArrayGuard {
        return new ArrayGuard();
    }

    /**
     * @returns A new instance of BooleanGuard.
     */
    public static boolean(): BooleanGuard {
        return new BooleanGuard();
    }

    /**
     * @returns A new instance of DateStringGuard.
     */
    public static dateString(): DateStringGuard {
        return new DateStringGuard();
    }

    /**
     * @returns A new instance of ClassGuard.
     */
    public static class(): ClassGuard {
        return new ClassGuard();
    }

    /**
     * @returns A new instance of NilGuard.
     */
    public static nil(): NilGuard {
        return new NilGuard();
    }

    /**
     * @returns A new instance of NumberGuard.
     */
    public static number(): NumberGuard {
        return new NumberGuard();
    }

    /**
     * @returns A new instance of StringGuard.
     */
    public static string(): StringGuard {
        return new StringGuard();
    }
}
