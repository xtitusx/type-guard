type-guard

TypeDoc: https://htmlpreview.github.io/?https://raw.githubusercontent.com/xtitusx/type-guard/master/docs/index.html

Simple examples:

const arraySuccess: boolean = TypeGuard.array().hasMinSize(2).contains("foo").guard(['foo', 'bar']).isSuccess();

const booleanSuccess: boolean = TypeGuard.boolean().isTrue().guard(1 > 0).isSuccess();

const classSuccess: boolean = TypeGuard.class().isInstanceOf(Number).guard(new Number(1)).isSuccess();

const dateStringSuccess: boolean = TypeGuard.dateString().isIso8601Date().isSameOrBefore('2016-01-20T00:00:00+02:00').guard('2015-02-28');

const nilSuccess: boolean = TypeGuard.nil().isNil(null).guard(null).isSuccess();

const numberSuccess: boolean = TypeGuard.number().isIn(10, 20).isEven().guard(14).isSuccess();

const stringSuccess: boolean = TypeGuard.string().isAlpha().contains('foo').hasMaxLength(100).isTrimmed('left').guard("Lorem ipsum foo").isSuccess();

Bulk example:

const guardResult = new GuardResultBulk()
    .add([
        TypeGuard.array().hasMinSize(2).contains("foo").guard(['foo', 'bar'],
        TypeGuard.string().equals('foo').guard('foo'),
        TypeGuard.number().isIn(10, 20).isEven().guard(14),
    ])
    .combine();
    
const guardResult = new GuardResultBulk()
    .add([
        TypeGuard.array().hasMinSize(2).contains("foo").guard(['foo', 'bar'],
        TypeGuard.string().equals('foo').guard('foo'),
        TypeGuard.number().isIn(10, 20).isEven().guard(14),
    ])
    .stack();
