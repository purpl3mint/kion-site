import gulp from 'gulp'
import eslint from 'gulp-eslint'
import babel from 'gulp-babel'
import terser from 'gulp-terser'
import rename from 'gulp-rename'
import sourcemaps from 'gulp-sourcemaps'

export function script() {
    return gulp.src('src/js/main.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(terser())
        .pipe(sourcemaps.write())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('build/js'))
}