const { src, dest, series } = require('gulp');
const clean = require('gulp-clean');
const terser = require('gulp-terser');

function cleanSourceMaps() {
    return src('./build/src/**/*.js.map', { read: false }).pipe(clean());
}

function minifyJS() {
    return src('./build/src/**/*.js').pipe(terser()).pipe(dest('./build/src'));
}

exports.default = series(cleanSourceMaps, minifyJS);
