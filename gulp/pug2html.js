import gulp from 'gulp'
import plumber from 'gulp-plumber'
import pug from 'gulp-pug'
import pugLinter from 'gulp-pug-linter'
import { htmlValidator } from 'gulp-w3c-html-validator'
import bemValidator from 'gulp-html-bem-validator'

export function pug2html(cb) {
    return gulp.src('src/pages/*.pug')
        .pipe(plumber())
        .pipe(pugLinter({ reporter: 'default' }))
        .pipe(pug())
        .pipe(htmlValidator.analyzer())
        .pipe(htmlValidator.reporter())
        .pipe(bemValidator())
        .pipe(gulp.dest('build'))
}