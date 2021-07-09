[npm-url]: https://www.npmjs.com/package/@xtitusx/type-guard
[npm-image]: https://img.shields.io/npm/v/@xtitusx/type-guard
[ci-image]: https://img.shields.io/travis/com/xtitusx/type-guard
[codecov-url]: https://codecov.io/gh/xtitusx/type-guard
[codecov-image]: https://codecov.io/gh/xtitusx/type-guard/branch/master/graph/badge.svg?token=6WEWL2D8DB
[snyk-security-image]: https://snyk-widget.herokuapp.com/badge/npm/%40xtitusx%2Ftype-guard/badge.svg
[snyk-url]: https://snyk.io/test/github/xtitusx/type-guard/badge.svg
[snyk-image]: https://snyk.io/test/github/xtitusx/type-guard
[downloads-image]: https://img.shields.io/npm/dm/@xtitusx/type-guard
[min-size-image]: https://img.shields.io/bundlephobia/min/@xtitusx/type-guard

# type-guard

[![NPM version][npm-image]][npm-url]
![CI][ci-image]
[![Coverage][codecov-image]][codecov-url]
![Security Badge][snyk-security-image]
[![Known Vulnerabilities][snyk-url]][snyk-image]
[![Downloads][downloads-image]][npm-url]
[![Minified size][min-size-image]][npm-url]

**type-guard** performs a runtime check that guarantees the type and value of properties in some scopes.

:rocket: **Node.js ready for launch.**

:rocket: **Angular ready for launch.**

In a Domain Driven Design approach, it is very useful to check constraints on Domain Entity and ValueType properties.

It relies on `Tyr` to:

1. Call one of the seven specific Guards like `string()` or `number()`.
2. Call chained rule checkers.
3. Return a `GuardResult` instance containing the reason for the failure of the guard, or a success.

It also relies on `GuardResultBulk` to manage multiple `Tyr` invocations:

-   Combine and return the first `GuardResult` instance in failure, or only a `GuardResult` instance in success.
-   Stack and return all `GuardResult` instances in failure, or only a `GuardResult` instance in success.

# Table of Contents

1. [Installation](#installation)
2. [Basic Usage](#basic-usage)
    - [Guard Options](#guard-options)
3. [Tyr](#tyr)
    - [array()](#array)
    - [boolean()](#boolean)
    - [class()](#class)
    - [dateString()](#datestring)
    - [nil()](#nil)
    - [number()](#number)
    - [string()](#string)
4. [GuardResultBulk](#guardresultbulk)
    - [add()](#add)
    - [combine()](#combine)
    - [stack()](#stack)
5. [Codex](#codex)
6. [TypeDoc](#typedoc)
7. [Changelog](#changelog)
8. [The true story](#the-true-story)
9. [Maintainer](#maintainer)
10. [Licence](#licence)

## Installation

```
npm install @xtitusx/type-guard
```

## Basic Usage

In order to check and return a `GuardResult` instance, just invoke `Tyr`, call a specific Guard, and finish by calling `guard(propertyValue: unknown, propertyName?: string)` method which contains the property value and optionaly a property name.

-   A simple type property check:

```
Tyr.string().guard("foo");
```

-   Multiple chained rule checkers:

```
Tyr.string().isAlpha().contains('foo').hasMaxLength(100).isTrimmed('left').guard("Lorem ipsum foo");
```

```
Tyr.number().isMultiple(2).isMultiple(3).isMultiple(4).guard(12);
```

-   A fast validation returning simply a boolean:

```
Tyr.number().isIn(10, 20).isEven().guard(14).isSuccess();
```

-   A thrown exception with a `GuardResult` instance message:

```
 const guardResult = Tyr.dateString().isIso8601Date().guard('29-02-2021');
if (!guardResult.isSuccess()) {
    throw new Error(guardResult.getMessage());
}
```

### Guard Options

`Tyr.array()`, `Tyr.dateString()`, `Tyr.number()`, and `Tyr.string()` methods expect an `IGuardOptions` object optionaly:

```
export interface IGuardOptions {
    /**
     * A single type of rule, the last called in the chain, is retained by the guard.
     * @defaultValue false
     */
    overriding?: boolean;
}
```

```
const stringGuard = Tyr.string({ overriding: true }).isTrimmed('right').hasMinLength(2).hasMaxLength(100);

const guardResult1 = stringGuard.contains('dummy').guard('Lorem Ipsum is simply dummy text');

const guardResult2 = stringGuard
    .contains('random')
    .guard('Contrary to popular belief, Lorem Ipsum is not simply random text');
```

## Tyr

### array()

| Rule checker             | Description                                                                |
| ------------------------ | :------------------------------------------------------------------------- |
| isEmpty()                | Checks if array is empty.                                                  |
| isNotEmpty()             | Checks if array is not empty.                                              |
| hasSize(value: number)   | Checks if array's length is equal to the specified number.                 |
| hasMinSize(min: number)  | Checks if array's length is equal or greater than to the specified number. |
| hasMaxSize(max: number)  | Checks if array's length is equal or smaller than the specified number.    |
| contains(value: unknown) | Checks if array contains the specified value.                              |

### boolean()

| Rule checker | Description                         |
| ------------ | :---------------------------------- |
| isTrue()     | Checks if value is a true boolean.  |
| isFalse()    | Checks if value is a false boolean. |

### class()

| Rule checker                  | Description                                                                                                              |
| ----------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| isInstanceOf(value: Function) | Checks if the prototype property of the param constructor appears anywhere in the prototype chain of the guarded object. |

### dateString()

| Rule checker                  | Description                                                               |
| ----------------------------- | :------------------------------------------------------------------------ |
| isIso8601Date()               | Checks if date string is a valid and existing ISO 8601 Date (YYYY-MM-DD). |
| isRfc3339()                   | Checks if date string is a valid and existing RFC 3339 Datetime.          |
| isSame(value: string)         | Checks if date string is the same that the specified date.                |
| isSameOrBefore(value: string) | Checks if date string is the same or before the specified date.           |
| isSameOrAfter(value: string)  | Checks if date string is the same or after the specified date.            |
| isBefore(value: string)       | Checks if date string is strictly before the specified date.              |
| isAfter(value: string)        | Checks if date string is strictly after the specified date.               |

### nil()

| Rule checker     | Description                                    |
| ---------------- | :--------------------------------------------- |
| isUndefined()    | Checks if value is undefined.                  |
| isNotUndefined() | Checks if value is not undefined.              |
| isNull           | Checks if value is null.                       |
| isNotNull()      | Checks if value is not null.                   |
| isNil()          | Checks if value is undefined or null.          |
| isNotNil()       | Checks if value is neither undefined nor null. |

### number()

| Rule checker                            | Description                                                                            |
| --------------------------------------- | :------------------------------------------------------------------------------------- |
| equals(value: number)                   | Checks if two numbers are equals.                                                      |
| isMin(min: number)                      | Checks if number is equal or greater than to the specified number.                     |
| isMax(max: number)                      | Checks if number is equal or smaller than to the specified number.                     |
| isBetween(min: number, max: number)     | Checks if number is within a closed interval.                                          |
| isIn(values: number[])                  | Checks if number is in an array of allowed number values.                              |
| isPositive()                            | Checks if number is greater than zero.                                                 |
| isNegative()                            | Checks if number is smaller than zero.                                                 |
| isWhole()                               | Checks if number is a whole number.                                                    |
| hasMaxFractionDigits(max: number)       | Checks if the fractional part of number is equal or smaller than the specified number. |
| isEven()                                | Checks if number is even.                                                              |
| isOdd()                                 | Checks if number is odd.                                                               |
| isMultiple(value: number)               | Checks if number is a multiple of the specified number.                                |
| isPrime()                               | Checks if number is a prime number.                                                    |
| isComposite()                           | Checks if number is a composite number.                                                |
| isFibonacci(allowNegative?: boolean)    | Checks if number is a Fibonacci or a NegaFibonacci number.                             |
| isNetworkPort(range?: NetworkPortRange) | Checks if number is a Network Port.                                                    |

### string()

| Rule checker                                                                | Description                                                                     |
| --------------------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| equals(value: string)                                                       | Checks if two string are equals.                                                |
| notEquals(value: string)                                                    | Checks if two string are not equals.                                            |
| contains(value: string)                                                     | Checks if string contains the specified substring.                              |
| notContains(value: string)                                                  | Checks if string does not contain the specified substring.                      |
| matches(value: RegExp)                                                      | Checks if string matches the specified regex.                                   |
| isIn(value: string[])                                                       | Checks if string is in an array of allowed string values.                       |
| isEmpty()                                                                   | Checks if string is empty.                                                      |
| isNotEmpty()                                                                | Checks if string is not empty.                                                  |
| hasLength(value: number)                                                    | Checks if string's length is equal to the specified number.                     |
| hasMinLength(min: number)                                                   | Checks if string's length is equal or greater than to the specified number.     |
| hasMaxLength(max: number)                                                   | Checks if string's length is equal or smaller than the specified number.        |
| isUpperCase()                                                               | Checks if string does not contain any lowercase alpha characters.               |
| isLowerCase()                                                               | Checks if string does not contain any uppercase alpha characters.               |
| isCapitalized(style: CapitalizationStyle, checkFirstCharIsLetter?: boolean) | Checks if string follows a capitalization style.                                |
| isProgrammingCase(convention: ProgrammingConvention)                        | Checks if string follows one of the most popular programming naming convention. |
| isTrimmed(side: TrimmedSide)                                                | Checks if string does not contain any leading and trailing whitespace.          |
| isAlphaNumeric()                                                            | Checks if string only contains alpha characters and/or numbers.                 |
| isAlpha(alphabet?: Alphabet)                                                | Checks if string only contains alpha characters.                                |
| isNumeric()                                                                 | Checks if string only contains numbers.                                         |
| isAscii()                                                                   | Checks if string only contains printable ASCII characters.                      |
| isBinary()                                                                  | Checks if string is a binary number (base-2).                                   |
| isOctal()                                                                   | Checks if string is an octal number (base-8).                                   |
| isHex()                                                                     | Checks if string is a hexadecimal number (base-16).                             |
| isBase64(impl: Base64Implementation)                                        | Checks if string is Base64 encoded.                                             |
| isJson(format?: JsonFormat)                                                 | Checks if string is a valid JSON string.                                        |
| isDecimal(options?: IIsDecimalOptions)                                      | Checks if string is a decimal number.                                           |
| isEmailAddress(def?: EmailAddressDefinition)                                | Checks if string is an email address.                                           |
| isObjectId()                                                                | Checks if string is a representation of a MongoDB ObjectId.                     |
| isHexColor(digits?: HexColorDigits)                                         | Checks if string is a hexadecimal color.                                        |
| isUuidv4()                                                                  | Checks if string is an Universally unique identifier v4.                        |
| isMacAddress()                                                              | Checks if string is a MAC address.                                              |
| isIpAddress(version?: IpVersion)                                            | Checks if string is an IP address.                                              |
| isLatitude(format?: GeoCoordinatesFormat)                                   | Checks if string is a latitude geographic coordinate.                           |
| isLongitude(format?: GeoCoordinatesFormat)                                  | Checks if string is a longitude geographic coordinate.                          |
| isLatLong(format?: GeoCoordinatesFormat)                                    | Checks if string is a latitude-longitude geographic coordinate.                 |
| isIso639Part1Alpha2()                                                       | Checks if string is an ISO 639-1 alpha-2 language code.                         |
| isIso639Part2Alpha3()                                                       | Checks if string is an ISO 639-2 alpha-3 (bibliographic version) language code. |
| isIso3166Part1Alpha(version?: AlphaVersion)                                 | Checks if string is an ISO 3166-1 alpha country code.                           |
| isIso4217Alpha3()                                                           | Checks if string is an ISO 4217 alpha-3 currency code.                          |

## GuardResultBulk

### add()

Adds `GuardResult` instance(s) in bulk:

```
const guardResultBulk = new GuardResultBulk().add(Tyr.string().equals('foo').guard('foo'));
```

### combine()

Returns either the first fail in bulk, or only one success:

```
const guardResult = new GuardResultBulk()
    .add([
        Tyr.array().hasMinSize(2).contains("foo").guard(['foo', 'bar'],
        Tyr.string().equals('foo').guard('foo'),
        Tyr.number().isIn(10, 20).isEven().guard(14),
    ])
    .combine();

```

### stack()

Returns all fails in bulk, or only one success:

```
const guardResult = new GuardResultBulk()
    .add([
        Tyr.array().hasMinSize(2).contains("foo").guard(['foo', 'bar'],
        Tyr.string().equals('foo').guard('foo'),
        Tyr.number().isIn(10, 20).isEven().guard(14),
    ])
    .stack();
```

## Codex

Refer to the Codex to directly access Enums containing some ISO values:
| Codex entry | Description | Returns |
| --- |:--- | :--- |
| Codex.iso3166Part1Alpha2Codes() | List of ISO 3166-1 alpha-2 country codes. | Iso4217Alpha3[] |
| Codex.iso3166Part1Alpha3Codes() | List of ISO 3166-1 alpha-3 country codes. | Iso639Part1Alpha2[] |
| Codex.iso4217Alpha3Codes() | List of active ISO 4217 alpha-3 currency codes. | Iso639Part2Alpha3[] |
| Codex.iso639Part1Alpha2Codes() | List of 184 ISO 639-1 alpha-2 language codes. | Iso3166Part1Alpha2[] |
| Codex.iso639Part2Alpha3Codes() | List of 487 ISO 639-2 alpha-3 language codes. | Iso3166Part1Alpha3[] |

## TypeDoc

[GitHub HTML Preview](https://htmlpreview.github.io/?https://raw.githubusercontent.com/xtitusx/type-guard/master/docs/index.html)

## Changelog

See information about breaking changes and release notes [here](CHANGELOG.md).

## The true story

Once upon a time there was a forgotten kingdom, lost in the far north, called TypGard :rainbow:.

This kingdom was populated by two complementary tribes living in harmony: the Backings and the Frontkings.
Two other tribes, constantly at war, the Vikings and the Nanokings quarreled in the mountains :mount_fuji:, but we will not discuss them in this story ...

The Backings were a people of craftsmen: miners :gem:, blacksmiths :hammer:, loggers, lumberjacks.
The Frontkings were a tribe skilled in the arts, including body painting :performing_arts: and storytelling :violin:.

After each daily thing :coffee:, Frontking's skalds often swapped the tale of one or two sagas against the essential goods produced by the Backings.

And all this little small world lived in cooperation and peace, until the day, when curious foreigners from the south, tried to sow trouble, and divide this beautiful and well-ordered kingdom :snake:.
The northerners, not understanding their language, decided to simply name these invaders the sons of Julius, or Jsøns in Old Nordic language.

The Jsøns were devious and manipulative, and the Northerners never knew if they were telling them the truth :suspect:.

Fortunately, they could rely on Tyr, the deity of order and law, to gauge each suspected Jsøn, and validate his claims.

Tyr was accompanied by seven guards, each representing an aspect of the order ...

## Maintainer

-   [xtitusx](https://github.com/xtitusx) - **Benjamin Tussac** (author)

## Licence

```
MIT License

Copyright (c) 2021 Benjamin Tussac

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
