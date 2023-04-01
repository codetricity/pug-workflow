const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const pug = require('gulp-pug');
const browsersync = require('browser-sync').create();

function scssTask(){
    return src('src/scss/style.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(dest('dist', { sourcemaps: '.'}));
    }


function pugTask() {
        return src("src/pug/*.pug")
        .pipe(pug({pretty: true}))
        .pipe(dest("dist"));
    }


function browsersyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: "dist"
        }
    });
    cb();
}


function browsersyncReload(cb) {
    browsersync.reload();
    cb();
}

function watchTask() {
    // watch("src/pug/*.pug", series(pugTask, browsersyncReload));
    watch("dist/*.html", browsersyncReload)
    watch(['src/scss/*.scss'], series(scssTask, browsersyncReload));
}



exports.default = series(
    scssTask,
    // pugTask,
    browsersyncServe,
    watchTask
);