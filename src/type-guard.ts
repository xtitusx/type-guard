import { ArrayGuard } from './guards/array-guard';
import { BooleanGuard } from './guards/boolean-guard';
import { ClassGuard } from './guards/class-guard';
import { DateStringGuard } from './guards/date-string-guard';
import { NilGuard } from './guards/nil-guard';
import { NumberGuard } from './guards/number-guard';
import { StringGuard } from './guards/string-guard';

export class TypeGuard {
    public static array(): ArrayGuard {
        return new ArrayGuard();
    }

    public static boolean(): BooleanGuard {
        return new BooleanGuard();
    }

    public static dateString(): DateStringGuard {
        return new DateStringGuard();
    }

    public static class(): ClassGuard {
        return new ClassGuard();
    }

    public static nil(): NilGuard {
        return new NilGuard();
    }

    public static number(): NumberGuard {
        return new NumberGuard();
    }

    public static string(): StringGuard {
        return new StringGuard();
    }
}
