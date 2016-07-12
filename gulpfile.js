'use strict';

const gulp = require('gulp');
const webpack = require('webpack-stream');
const del = require('del');
const sass = require('gulp-sass');

const paths = {
  js: __dirname + '/app/**/*.js',
  html: __dirname + '/app/**/*.html',
  css: __dirname + '/app/**/*.css'
};

gulp.task('clean', () => {
  return del('./build/**/*');
});

gulp.task('clean-css', () => {
  return del('./app/stylesheets/*.css');
});

gulp.task('copy-html', () => {
  return gulp.src(paths.html)
    .pipe(gulp.dest('./build'));
});

gulp.task('copy-css', () => {
  return gulp.src(paths.css)
    .pipe(gulp.dest('./build'));
});

gulp.task('sass', ['clean-css'], () => {
  return gulp.src('./app/stylesheets/**/*/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build'));
});

gulp.task('sass:watch', () => {
  gulp.watch('./app/stylesheets/**/*.scss', ['sass']);
});

gulp.task('bundle', () => {
  return gulp.src(paths.js)
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('bundle:test', () => {
  return gulp.src(__dirname + '/test/*-test.js')
    .pipe(webpack({
      output: {
        filename: 'test-bundle.js'
      }
    }))
    .pipe(gulp.dest(__dirname + '/test'));
});

gulp.task('watch', () => {
  gulp.watch('./app/*', ['build', 'sass:watch']);
});

gulp.task('build', ['clean', 'sass', 'copy-html', 'copy-css', 'bundle']);

gulp.task('default', ['build']);
