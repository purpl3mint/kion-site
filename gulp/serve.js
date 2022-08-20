import gulp from 'gulp'
import compression from 'compression'
import http2 from 'http2'

import { imageMinify } from './imageMinify.js'
import { styles } from './styles.js'
import { pug2html } from './pug2html.js'
import { script } from './script.js'

import browserSync from 'browser-sync'
const server = browserSync.create()

export function serve(cb) {
    server.init({
        server: {
            baseDir: 'build',
            middleware: function(req,res,next){
                let gzip = compression();
                gzip(req,res,next);
            }
        },
        httpModule: http2,
        notify: false,
        open: true,
        cors: true
    })

    gulp.watch('src/img/*/*.{gif,png,jpg,svg,webp}', gulp.series(imageMinify)).on('change', server.reload)
    gulp.watch('src/styles/**/*.scss', gulp.series(styles)).on('change', server.reload)
    gulp.watch('src/js/**/*.js', gulp.series(script)).on('change', server.reload)
    gulp.watch('src/pages/**/*.pug', gulp.series(pug2html)).on('change', server.reload)
    gulp.watch('build/*.html').on('change', server.reload)
}