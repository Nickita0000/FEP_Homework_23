const { src, dest, series, parallel, watch} = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const { path } = require('./gulp/const.js')


function serveTask (done) {
    browserSync.init({
        serve: {
            baseDir: path.dest
        }
    });

    watch(path.srcHtml, series(copyHtmlTask, reloadBrowser))
    watch(path.srcCss, series(copyCssTask, reloadBrowser))
    watch(path.srcJsAll, series(copyJsTask, reloadBrowser))

    done()
}

function reloadBrowser(done) {
    browserSync.reload();
    done()
}

function buildTask() {
    return series(
        cleanDistTask,
        parallel(
            copyHtmlTask,
            copyJsTask,
            copyCssTask,
            copyVendorTask
        )
    )
}

function copyHtmlTask () {
    return src(path.srcHtml)
        .pipe(dest(path.dest))
}

function copyJsTask () {
    return src(path.srcJs)
        .pipe(concat(path.destJs))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest(path.dest))
}

function copyCssTask () {
    return src(path.srcCss)
        .pipe(concat(path.destCss))
        .pipe(dest(path.dest))
}

function copyVendorTask () {
    return src(path.jsVendorSrc)
        .pipe(concat(path.destVendor))
        .pipe(dest(path.dest))
}

function cleanDistTask() {
    return src(path.dest, {read: false, allowEmpty : true}).pipe(clean())
}

exports.build = buildTask()
exports.serve = series(buildTask(), serveTask)