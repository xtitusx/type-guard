# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [4.1.0] - 2021-12-03

### Added

-   Add Tyr.string().isBoolean() method.

### Fixed

-   Fix Tyr.string().isLatLong() error messages.
-   Fix Tyr.string().isLatitude() error messages.
-   Fix Tyr.string().isLongitude() error messages.

## [4.0.0] - 2021-07-15

### Added

-   Add Tyr.number().isBetween() method, with the same behavior as the old Tyr.number().isIn() method.
-   Add Tyr.number().isNotIn() method.
-   Add Tyr.string().isNotIn() method.
-   Add an optional parameter to Tyr.string().isIso639Part2Alpha3() method, accepted values are 'bibliographic' or 'terminologic'.
-   Add an optional parameter to Tyr.string().isMacAddress() method, accepted values are 'IEEE' or 'IETF'.
-   Add an optional parameter to Codex.iso639Part2Alpha3Codes() method, accepted values are 'bibliographic' or 'terminologic'.

### Changed

-   Rewrite Tyr.number().isIn() method, in order to check if a number is in an array of allowed number values (BREAKING CHANGE).

### Fixed

-   Fix Tyr.number().isNetworkPort() error messages.
-   Fix Tyr.string().isIn() method signature.

## [3.0.0] - 2021-06-26

### Added

-   Add optional parameter 'gajs-latin' to Tyr.string().isAlpha() method.

### Changed

-   Convert Codex Enums to readonly Arrays (BREAKING CHANGE).

## [2.5.0] - 2021-06-20

### Added

-   Add optional parameters 'dan', 'est', 'fin', 'gle', 'hun', 'nld' and 'pol' to Tyr.string().isAlpha() method.

## [2.4.0] - 2021-06-03

### Added

-   Add optional parameters 'isl, 'ita', 'nor', 'por', 'spa' and 'swe' to Tyr.string().isAlpha() method.

### Changed

-   Rewrite Tyr.string().isAlphaNumeric() method TSDoc.
-   Rewrite Tyr.string().isCapitalized() method TSDoc.

## [2.3.0] - 2021-05-21

### Fixed

-   Fix Tyr.string().isAlpha() default parameter to 'basic-latin'.

### Added

-   Add optional parameters 'deu' and 'fra' to Tyr.string().isAlpha() method.

## [2.2.1] - 2021-05-18

### Fixed

-   Fix Tyr.string().isAlpha('precomposed-latin') method, supported sets are Basic Latin, Latin-1_Supplement, Latin Extended A, Latin Extended B, Latin Extended Additional, one IPA Extension letter (ʒ), and one Latin trigram letter (C'h).

## [2.2.0] - 2021-05-13

### Added

-   Add an optional parameter to Tyr.string().isAlpha() method, accepted values are 'basic-latin' or 'precomposed-latin'.
