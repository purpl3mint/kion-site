import gulp from 'gulp'
import plumber from 'gulp-plumber'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import shorthand from 'gulp-shorthand'
import cleanCSS from 'gulp-clean-css'
import sourcemaps from 'gulp-sourcemaps'
//import gulpStylelint from 'gulp-stylelint'
import rename from 'gulp-rename'

const sass = gulpSass(dartSass)
//WARNING
//Commented sourcemaps because it takes a lot of space in build

export function styles() {
    return gulp.src('src/styles/*.scss')
        .pipe(plumber())
        /*
        .pipe(gulpStylelint({
            failAfterError: false,
            reporters: [
              {
                formatter: 'string',
                console: true
              }
            ]
          }))
        */
        //.pipe(gulpStylelint())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(shorthand())
        .pipe(cleanCSS({
            debug: true,
            compatibility: '*'
          }, details => {
            console.log(`${details.name}: Original size:${details.stats.originalSize} - Minified size: ${details.stats.minifiedSize}`)
          }))
        //.pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/css'))
}