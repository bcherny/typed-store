import babel from 'gulp-babel'
import gulp from 'gulp'
import notifier from 'node-notifier'
import ts from 'gulp-typescript'
import util from 'gulp-util'
import watch from 'gulp-watch'

const SRC_DIR = './src'
const DIST_DIR = './dist'

gulp.task('scripts', function () {

  return gulp.src(`${ SRC_DIR }/*.ts`)
    .on('error', compileError)
    .pipe(ts({
      module: 'commonjs',
      target: 'es6'
    }))
    .pipe(babel({
      modules: 'umd'
    }))
    .pipe(gulp.dest(DIST_DIR))

})

gulp.task('default', [
  'scripts'
])

gulp.task('watch', function () {

  watch(`${ SRC_DIR }/*.ts`, start('scripts'))

})

function start (task) {
  return function(){ gulp.start(task) }
}

function error (err, prefix) {
  notifier.notify({
    message: `Error: ${ err.message }`,
    title: prefix || 'Error'
  })
  util.log(util.colors.red.bold(prefix || 'Error'), err.message)
}

function compileError (err) {
  error.call(this, err, 'Compile error')
  this.emit('end')
}