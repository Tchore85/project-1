const autoprefixer = require("gulp-autoprefixer"),
  browserSync = require("browser-sync"),
  cssnano = require("gulp-cssnano"),
  eslint = require("gulp-eslint"),
  gulp = require("gulp"),
  prettyError = require("gulp-prettyerror"),
  rename = require("gulp-rename"),
  sourcemaps = require("gulp-sourcemaps"),
  terser = require("gulp-terser"),
  babel = require("gulp-babel"),
  streamqueue = require("streamqueue"),
  concat = require("gulp-concat");

// Create basic Gulp tasks

gulp.task("styles", function() {
  return streamqueue(
    { objectMode: true },
    gulp.src("css/reset.css"),
    gulp.src("css/fonts.css"),
    gulp.src("css/style.css")
  )
    .pipe(concat("all.css"))
    .pipe(sourcemaps.init())
    .pipe(prettyError())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(cssnano())
    .pipe(rename({ extname: ".min.css" }))
    .pipe(sourcemaps.write("../maps"))
    .pipe(gulp.dest("build/css"));
});

gulp.task("lint", function() {
  return gulp
    .src(["js/*.js"])
    .pipe(prettyError())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task(
  "scripts",
  gulp.series("lint", function() {
    return gulp
      .src("js/*.js")
      .pipe(
        babel({
          presets: ["env"]
        })
      )
      .pipe(terser())
      .pipe(
        rename({
          extname: ".min.js"
        })
      )
      .pipe(gulp.dest("build/js"));
  })
);

// Set-up BrowserSync and watch

gulp.task("browser-sync", function(done) {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp
    .watch(["build/css/*.css", "build/js/*.js"])
    .on("change", browserSync.reload);
  done();
});

gulp.task("watch", function(done) {
  gulp.watch("js/*.js", gulp.series("scripts"));
  gulp.watch("css/*.css", gulp.series("styles"));
  done();
});

gulp.task("default", gulp.parallel("browser-sync", "watch"));
