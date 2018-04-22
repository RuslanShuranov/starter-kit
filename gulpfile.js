'use strict';

var gulp = require('gulp'),
  scss = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  babel = require('gulp-babel'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  plumber = require('gulp-plumber'),
  imagemin = require('gulp-imagemin'),
  cssmin = require('gulp-cssmin'),
  runSequence = require('run-sequence'),
  del = require('del'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload;

var SASS_INCLUDE_PATHS = [
  'node_modules/reset-css/reset.scss',
  'node_modules/flexbox-grid-sass/src/flexbox-grid.scss'
];


function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('styles', function () {
  return gulp.src('src/scss/main.scss')
    .pipe(plumber({errorHandler: handleError}))
    .pipe(concat('main.min.css'))
    .pipe(sourcemaps.init())
    .pipe(scss({outputStyle: 'compressed', includePaths: SASS_INCLUDE_PATHS}))
    .pipe(autoprefixer({browsers: ['last 2 versions', 'safari 8', 'ie 11', 'opera 12.1', 'ios 6', 'android 4']}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css'));
});


gulp.task('js', function () {
  return gulp.src('src/source-js/**/*.js')
    .pipe(plumber({errorHandler: handleError}))
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));
});


gulp.task('images', function () {
  return gulp.src('src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'))
});

gulp.task('clean', function () {
  return del(['build/']);
});

gulp.task('fonts', function () {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('watch', function () {
  runSequence('clean', ['styles'], ['js'], ['fonts'], ['images'],
    function () {
      gulp.watch('./src/scss/**/*.scss', ['styles']);
      gulp.watch('./src/source-js/**/*.js', ['js']);
      gulp.watch('./src/fonts/*', ['fonts']);
      gulp.watch('./src/images/**/*', ['images']);
    })
});

gulp.task('default', function () {
  runSequence('clean', ['styles'], ['js'], ['fonts'], ['images'],
    function () {

    })
});