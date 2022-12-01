const { src, dest, series } = require('gulp');
const clean = require('gulp-clean');
const terser = require('gulp-terser');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function cleanSourceMaps() {
    return src('./build/src/**/*.js.map', { read: false }).pipe(clean());
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function minifyJs() {
    return src('./build/src/**/*.js').pipe(terser()).pipe(dest('./build/src'));
}

exports.default = series(cleanSourceMaps, minifyJs);
