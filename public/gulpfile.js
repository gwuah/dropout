"use strict";

var gulp = require("gulp"),
  sass = require("gulp-sass");

let paths = {
  sass: {
    src: "./css/main.scss",
    dest: "./css/"
  }
};
// Sass compiler and auto reloader
gulp.task("sass", function() {
  return gulp
    .src(paths.sass.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(paths.sass.dest));
});

gulp.task("sass:watch", function() {
  gulp.watch("./css/*.scss", ["sass"]);
});

gulp.task("start", ["sass", "sass:watch"]);
