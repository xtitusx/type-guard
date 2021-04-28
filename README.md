# type-guard

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Minified size][min-size-image]][npm-url]

type-guard performs a runtime check that guarantees the type and value of properties in some scopes.

It relies on Tyr to:
1. Call a specific Guard (string(), number(), and many others).
2. Run chained rule checkers.
3. Return a GuardResult instance containing the reason for the failure of the guard, or a success.

It also relies on GuardResultBulk to manage multiple Tyr invocations:
* Combine and return the first GuardResult instance in failure, or only a GuardResult instance in success.
* Stack and return all GuardResult instances in failure, or only a GuardResult instance in success.

# Table of Contents
1. [Installation](#installation)
2. [Tyr](#tyr)
3. [Simple examples](#simple-examples)
4. [Bulk Examples](#bulk-examples)
5. [Codex](#codex)
5. [TypeDoc](#typedoc)

## Installation
```
npm install @xtitusx/type-guard
```
## Tyr
In order to check and return a GuardResult instance, just invoke Tyr, call a specific Guard, and finish with a .guard() call containing the property.

* Example of a simple type property check:
```
Tyr.string().guard("foo");
```

* Example of multiple chained rule checkers:
```
Tyr.string().isAlpha().contains('foo').hasMaxLength(100).isTrimmed('left').guard("Lorem ipsum foo");
```

Notice that only a single type of rule checker is retained in the guard: the last called one.

So, in the following example, .contains('bar') will override .contains('foo'):
```
Tyr.string().contains('foo').contains('bar').guard("foo");
```

## Simple examples
```
const success: boolean = Tyr.array().hasMinSize(2).contains("foo").guard(['foo', 'bar']).isSuccess();

const success: boolean = Tyr.boolean().isTrue().guard(1 > 0).isSuccess();

const success: boolean = Tyr.class().isInstanceOf(Number).guard(new Number(1)).isSuccess();

const success: boolean = Tyr.dateString().isIso8601Date().isSameOrBefore('2016-01-20T00:00:00+02:00').guard('2015-02-28');

const success: boolean = Tyr.nil().isNil(null).guard(null).isSuccess();

const success: boolean = Tyr.number().isIn(10, 20).isEven().guard(14).isSuccess();

const success: boolean = Tyr.string().isAlpha().contains('foo').hasMaxLength(100).isTrimmed('left').guard("Lorem ipsum foo").isSuccess();
```
## Bulk examples
```
const guardResult = new GuardResultBulk()
    .add([
        Tyr.array().hasMinSize(2).contains("foo").guard(['foo', 'bar'],
        Tyr.string().equals('foo').guard('foo'),
        Tyr.number().isIn(10, 20).isEven().guard(14),
    ])
    .combine();
    
const guardResult = new GuardResultBulk()
    .add([
        Tyr.array().hasMinSize(2).contains("foo").guard(['foo', 'bar'],
        Tyr.string().equals('foo').guard('foo'),
        Tyr.number().isIn(10, 20).isEven().guard(14),
    ])
    .stack();
```

```
const guardResult = new GuardResultBulk()
    .add([
        Tyr.array().hasMinSize(2).contains("foo").guard(['foo', 'bar'],
        Tyr.string().equals('foo').guard('foo'),
        Tyr.number().isIn(10, 20).isEven().guard(14),
    ])
    .combine();
    
const guardResult = new GuardResultBulk()
    .add([
        Tyr.array().hasMinSize(2).contains("foo").guard(['foo', 'bar'],
        Tyr.string().equals('foo').guard('foo'),
        Tyr.number().isIn(10, 20).isEven().guard(14),
    ])
    .stack();
```
## Codex
Refer to the Codex to directly access to Enums containing some ISO values:
| Codex entry                       | Description                                       |
| ---                               |:---                                               |
| Codex.iso639Part1Alpha2Enum()     | List of 184 ISO 639-1 alpha-2 language codes.     |
| Codex.iso639Part2Alpha3Enum()     | List of 487 ISO 639-2 alpha-3 language codes.     |
| Codex.iso3166Part1Alpha2Enum()    | List of ISO 3166-1 alpha-2 country codes.         |
| Codex.iso3166Part1Alpha3Enum()    | List of ISO 3166-1 alpha-3 country codes.         |
| Codex.iso4217Alpha3Enum()         | List of active ISO 4217 alpha-3 currency codes.   |
## TypeDoc
[GitHub HTML Preview](https://htmlpreview.github.io/?https://raw.githubusercontent.com/xtitusx/type-guard/master/docs/index.html)
## Maintainer
- [xtitusx](https://github.com/xtitusx) - **Benjamin Tussac** (author)

[npm-url]: https://www.npmjs.com/package/@xtitusx/type-guard
[npm-image]: https://img.shields.io/npm/v/@xtitusx/type-guard
[downloads-image]: https://img.shields.io/npm/dm/@xtitusx/type-guard
[min-size-image]: https://img.shields.io/bundlephobia/min/@xtitusx/type-guard