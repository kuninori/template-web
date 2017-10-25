'use strict';
const gulp = require("gulp");
const del = require("del");
const runSequence = require("run-sequence");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const webpackDevConf = require('./webpack.dev.config.js');
const webpackProdConf = require('./webpack.production.config.js');
const browserSync = require('browser-sync');
const gulpLoadPlugins = require('gulp-load-plugins');
const g = gulpLoadPlugins();

const dist = "app";
const base = __dirname + "/";

const path = {
  pug    : [`${base}src/**/*.pug`, `${base}src/**/_*.pug`],
  css  : [`${base}src/**/*.pcss`],
  webpack : [`${base}src/**/*.jsx`],
  image   : [`${base}src/**/*.{png,jpg,jpeg,gif,svg}`],
  resource: [`${base}src/**/*.{html,xml,ico}`]
};


let mode; // dev or prodcution
gulp.task("init-dev", () => {
  mode = "dev";
});
gulp.task("init-prod", () => {
  mode = "production";
});

gulp.task('reload', () => { browserSync.reload(); })

gulp.task('clean', () => { del([dist+'/*']) });

gulp.task('pug', () => {
  gulp.src(path.pug)
    .pipe(g.plumber())
    .pipe(g.pug({pretty: true}))
    .pipe(gulp.dest(base + dist))
});

gulp.task('css', () => {
  gulp.src(path.css)
    .pipe(g.postcss([require("precss")]))
    .pipe(g.ext.replace("css"))
    .pipe(gulp.dest(base + dist))
});
gulp.task('webpack', () => {
  const conf =  mode === "dev" ? webpackDevConf : webpackProdConf;
  gulp.src(path.webpack)
    .pipe(g.plumber())
    .pipe(webpackStream(conf, webpack))
    .pipe(gulp.dest(base + dist))
});

gulp.task('resource', () => {
  gulp.src(path.resource)
    .pipe(g.plumber())
    .pipe(gulp.dest(base + dist))
});

gulp.task('image', () => {
  gulp.src(path.image)
    .pipe(g.plumber())
    .pipe(gulp.dest(base + dist))
});

gulp.task('serve', () => {
  browserSync({
    open  : true,
    server: dist
  });
});

gulp.task('dev', ['build:dev'], (cb) => {
  browserSync({
    open  : false,
    server: dist
  });

  const opt = {
    awaitWriteFinish: true
  };
  g.watch(path.pug, opt, () => gulp.start('pug', 'reload'));
  g.watch(path.css, opt, () => gulp.start('css', 'reload'));
  g.watch(path.webpack, opt, () => gulp.start('webpack', 'reload'));
  g.watch(path.image, opt, () => gulp.start('image', 'reload'));
  g.watch(path.resource, opt, () => gulp.start('resource', 'reload'));
});

gulp.task("build", (cb)=> runSequence(
  'clean',
  'image',
  'resource',
  ['pug', 'css', 'webpack'],
  cb
));
gulp.task('build:dev', (cb) => runSequence('init-dev', 'build', cb));
gulp.task('build:prod',(cb) => runSequence('init-prod', 'build',cb));
gulp.task("default", ["dev"]);