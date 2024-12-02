const gulp = require('gulp'); // подкл функций
const concat = require('gulp-concat-css'); //склеивает css файлы
const plumber = require('gulp-plumber');//плагин, который производит сборку, даже если в коде есть ошибки (как минимум пытается собрать этот код);
const del = require('del');//умеет удалять файлы и папки.
const browserSync = require('browser-sync').create(); //позволит сделать сервер с режимом просмотра результатов в реальном времени;

function html() {
  return gulp.src('src/**/*.html')
  .pipe(plumber())
  .pipe(gulp.dest('dist/'))
  .pipe(browserSync.reload({stream: true}));
}

exports.html = html;

function css() {
  return gulp
    .src('src/blocks/**/*.css')
    .pipe(plumber())
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({stream: true}));
}

exports.css = css;

//   function images() {
//     return gulp.src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}')
//               .pipe(gulp.dest('dist/images'))
//   }

//   exports.images = images;

function fonts() {
  return gulp.src('src/fonts/**/*.{woff2,woff}')
  .pipe(gulp.dest('dist/fonts'))
  .pipe(browserSync.reload({stream: true}));
}

exports.fonts = fonts;

function clean() {
  return del('dist');
}

exports.clean = clean;

const build = gulp.series(clean, gulp.parallel(html, css, fonts));

exports.build = build;

function watchFiles() { //отслеживание изменений файлов 
  gulp.watch(['src/**/*.html'], html); 
  gulp.watch(['src/blocks/**/*.css'], css);
  gulp.watch(['src/fonts/**/*.{woff2,woff}'], fonts);
}

function serve() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
} 

const watchapp = gulp.parallel(build, watchFiles, serve); //связывание сборки и отслеживания

exports.watchapp = watchapp;

exports.default = watchapp; //теперь все команды вызываются через gulp