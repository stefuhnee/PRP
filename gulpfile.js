'use strict';

const gulp = require('gulp');
const webpack = require('webpack-stream');
const clean = require('gulp-clean');
const sass = require('gulp-sass');

const paths = {
  js: __dirname + '/app/**/*.js',
  html: __dirname + '/app/**/*.html',
  css: __dirname + '/app/**/*.css'
};

gulp.task('clean', ()=>{
  gulp.src('./build/**/*', {read:false})
    .pipe(clean());
  return gulp.src('./app/stylesheets/style.css', {read:false})
    .pipe(clean());
});

gulp.task('copy-html', ['clean'], ()=>{
  return gulp.src(paths.html)
    .pipe(gulp.dest('./build'));
});

gulp.task('copy-css', ['clean'], ()=>{
  return gulp.src(paths.css)
    .pipe(gulp.dest('./build'));
});

gulp.task('sass', ()=> {
  return gulp.src('./app/stylesheets/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/stylesheets'));
});

gulp.task('sass:watch', ()=> {
  gulp.watch('./app/stylesheets/**/*.scss', ['sass']);
});

gulp.task('bundle', ['clean'], ()=>{
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

gulp.task('watch', ()=>{
  gulp.watch('./app/*', ['build', 'sass:watch']);
});

gulp.task('build', ['clean', 'sass', 'copy-css', 'copy-html', 'bundle']);

gulp.task('default', ['build']);
