# type-guard

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Minified size][min-size-image]][npm-url]

## Installation

```
npm install @xtitusx/type-guard
```

## Basic usage
In order to check and validate your property, just invoke Tyr as following:
```
Tyr.string().isAlpha().contains('foo').hasMaxLength(100).isTrimmed('left').guard("Lorem ipsum foo").isSuccess();
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
In order to directly access Enums containing ISO values, simply call Codex:
```
Codex.iso639Part1Alpha2Enum(): List of 184 ISO 639-1 alpha-2 language codes
```
```
Codex.iso639Part2Alpha3Enum(): List of 487 ISO 639-2 alpha-3 language codes
```
```
Codex.iso3166Part1Alpha2Enum(): List of ISO 3166-1 alpha-2 country codes
```
```
Codex.iso3166Part1Alpha3Enum(): List of ISO 3166-1 alpha-3 country codes
```
```
Codex.Iso4217Alpha3Enum(): List of active ISO 4217 alpha-3 currency codes
```
## TypeDoc
[GitHub HTML Preview](https://htmlpreview.github.io/?https://raw.githubusercontent.com/xtitusx/type-guard/master/docs/index.html)

## Maintainer
- [xtitusx](https://github.com/xtitusx) - **Benjamin Tussac** (author)


[npm-url]: https://www.npmjs.com/package/@xtitusx/type-guard
[npm-image]: https://img.shields.io/npm/v/@xtitusx/type-guard
[downloads-image]: https://img.shields.io/npm/dm/@xtitusx/type-guard
[min-size-image]: https://img.shields.io/bundlephobia/min/@xtitusx/type-guard