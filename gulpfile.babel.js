'use strict';

import gulp from 'gulp';
import del from 'del';
import nib from 'nib';
import webpackDevConf from './webpack.dev.config.js';
import webpackProConf from './webpack.production.config.js';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
const g = gulpLoadPlugins();
const dist = "app";
const base = __dirname + "/";

const path = {
  jade    : [`${base}src/**/*.jade`,`${base}src/**/_*.jade`],
  stylus  : [`${base}src/**/*.styl`],
  webpack : [`${base}src/**/*.jsx`],
  image   : [`${base}src/**/*.{png,jpg,jpeg,gif,svg}`],
  resource: [`${base}src/**/*.{mov,mp4,ico}`]
};


var mode; // dev or prodcution
gulp.task("init-dev", ()=> {
  mode = "dev";
});
gulp.task("init-production", ()=> {
  mode = "production";
});

gulp.task('reload', ()=> { browserSync.reload(); })

gulp.task('clean', ()=> { del(['app/*']) });

gulp.task('jade', ()=> {
  gulp.src(path.jade)
    .pipe(g.plumber())
    .pipe(g.jade({ pretty: true }))
    .pipe(gulp.dest(base + dist))
});

gulp.task('stylus', ()=> {
  gulp.src(path.stylus)
    .pipe(g.plumber())
    .pipe(g.stylus({ use: [nib()] }))
    .pipe(gulp.dest(base + dist))
});
gulp.task('webpack', ()=> {
  var conf;
  if (mode == "dev") {
    conf = webpackDevConf;
  } else {
    conf = webpackProConf;
  }
  gulp.src(path.webpack)
    .pipe(g.plumber())
    .pipe(g.webpack(conf))
    .pipe(gulp.dest(base + dist))
});

gulp.task('resource', ()=> {
  gulp.src(path.resource)
    .pipe(g.plumber())
    .pipe(gulp.dest(base + dist))
});

gulp.task('image', ()=> {
  gulp.src(path.image)
    .pipe(g.plumber())
    .pipe(gulp.dest(base + dist))
});

gulp.task('serve', ()=> {
  browserSync({
    open  : true,
    server: "app/"
  });
});

gulp.task('dev', ['init-dev', 'clean', 'jade', 'stylus', 'webpack', 'image', 'resource'], (cb)=> {
  browserSync({
    open  : false,
    server: "app/"
  });

  var opt = {
    awaitWriteFinish: true
  };
  g.watch(path.jade, opt, ()=> gulp.start('jade', 'reload'));
  g.watch(path.stylus, opt, ()=> gulp.start('stylus', 'reload'));
  g.watch(path.webpack, opt, ()=> gulp.start('webpack', 'reload'));
  g.watch(path.image, opt, ()=> gulp.start('image', 'reload'));
  g.watch(path.resource, opt, ()=> gulp.start('resource', 'reload'));
});

gulp.task('build:dev', [
  'init-dev',
  'clean',
  'jade',
  'stylus',
  'webpack',
  'image',
  'resource'
]);

gulp.task('build:production', [
  'init-production',
  'clean',
  'jade',
  'stylus',
  'webpack',
  'image',
  'resource'
]);

