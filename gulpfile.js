'use strict';

const mocha = require('gulp-mocha');
const gulp = require('gulp');
const webpack = require('webpack-stream');
const lint = require('gulp-eslint');
const del = require('del');
const sass = require('gulp-sass');
const wp = require('webpack');

const paths = {
  js: __dirname + '/app/**/*.js',
  html: __dirname + '/app/**/*.html',
  css: __dirname + '/app/**/*.css',
  img: __dirname + '/**/*.{png, jpg, gif}',
  fonts: __dirname + '/**/*.{eot,ttf,woff,svg}'
};

gulp.task('linter', () => {
  return gulp.src(['./*.js', './models/*.js', './routes/*.js', './tests/*.js', './lib/*.js',
  './app/**/*.js'])
    .pipe(lint())
    .pipe(lint.format());
});

gulp.task('tests', () => {
  return gulp.src(['./test/back-end/*.js'], {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('clean', () => {
  return del('./public/**/*');
});

gulp.task('clean-css', () => {
  return del('./app/stylesheets/*.css');
});

gulp.task('copy-img', ['clean'], () => {
  return gulp.src(paths.img)
    .pipe(gulp.dest('./public'));
});

gulp.task('copy-html', ['clean'], () => {
  return gulp.src(paths.html)
    .pipe(gulp.dest('./public'));
});

gulp.task('copy-css', ['clean'], () => {
  return gulp.src(paths.css)
    .pipe(gulp.dest('./public'));
});

gulp.task('copy-fonts', ['clean'], () => {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('./public'));
});

gulp.task('sass', ['clean-css', 'clean'], () => {
  return gulp.src('./app/**/*/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public'));
});

gulp.task('sass:watch', ['clean-css'], () => {
  gulp.watch('./app/stylesheets/**/*.scss');
  gulp.src('./app/**/*/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public'));
});

gulp.task('bundle', ['clean'], () => {
  return gulp.src(paths.js)
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      },
      plugins: [new wp.DefinePlugin({
        'process.env': {
          'URL': JSON.stringify(process.env.URL)
        }
      })]
    }))
    .pipe(gulp.dest('./public'));
});

gulp.task('bundle:test', () => {
  return gulp.src(__dirname + '/test/front-end/*-test.js')
    .pipe(webpack({
      output: {
        filename: 'test-bundle.js'
      }
    }))
    .pipe(gulp.dest(__dirname + '/test/front-end'));
});

gulp.task('watch', () => {
  gulp.watch('./app/*', ['public', 'sass:watch']);
});

gulp.task('build', ['linter', 'clean', 'sass', 'copy-html', 'copy-css', 'copy-img', 'copy-fonts', 'bundle']);

gulp.task('default', ['build']);
