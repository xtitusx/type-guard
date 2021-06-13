# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.5.0] - 2021-06-09

### Added

-   Add optional parameters 'dan', 'fin', nld', and 'pol' to Tyr.string().isAlpha() method.

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
