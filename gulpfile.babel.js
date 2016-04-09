'use strict';

import gulp from 'gulp';
import del from 'del';
import webpackConf from './webpack.config';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
const g = gulpLoadPlugins();
const dist = "app";
const base = __dirname + "/";

const path = {
  jade    : base + "src/**/*.jade",
  stylus  : base + "src/**/*.styl",
  webpack : base + "src/**/*.jsx",
  image   : base + "src/**/*.{png|jpg|jpeg|gif|svg}",
  resource: base + "src/**/*.{s}"
};

gulp.task('reload', ()=> { browserSync.reload(); })

gulp.task('clean', ()=> { del(['app/*']) });

gulp.task('jade', ()=> {
  gulp.src(path.jade)
    .pipe(g.jade({ pretty: true }))
    .pipe(gulp.dest(base + dist))
});

gulp.task('stylus', ()=> {
  gulp.src(path.stylus)
    .pipe(g.stylus())
    .pipe(gulp.dest(base + dist))
});
gulp.task('webpack', ()=> {
  gulp.src(path.webpack)
    .pipe(g.webpack(webpackConf))
    .pipe(gulp.dest(base + dist))
});

gulp.task('image', ()=>{
  gulp.src(path.image)
    .pipe(g.copy)
});

gulp.task('dev', ['clean', 'jade', 'stylus', 'webpack'], (cb)=> {
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
});
