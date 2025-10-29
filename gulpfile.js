const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const terser = require("gulp-terser");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");

// Caminhos dos arquivos
const paths = {
  css: "src/**/*.css",
  js: "src/**/*.js",
  html: "src/**/*.html",
  img: "src/img/**/*",
};

// Minifica CSS
function minifyCSS() {
  return gulp.src(paths.css).pipe(cleanCSS()).pipe(gulp.dest("dist"));
}

// Minifica JS
function minifyJS() {
  return gulp.src(paths.js).pipe(terser()).pipe(gulp.dest("dist"));
}

// Minifica HTML
function minifyHTML() {
  return gulp
    .src(paths.html)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist"));
}

// Otimiza imagens
function optimizeImages() {
  return gulp.src(paths.img).pipe(imagemin()).pipe(gulp.dest("dist/img"));
}

// Exporta como tarefas nomeadas
exports.minifyCSS = minifyCSS;
exports.minifyJS = minifyJS;
exports.minifyHTML = minifyHTML;
exports.optimizeImages = optimizeImages;

// === TAREFA PADRÃO ===
exports.default = gulp.series(minifyHTML, minifyCSS, minifyJS, optimizeImages);
