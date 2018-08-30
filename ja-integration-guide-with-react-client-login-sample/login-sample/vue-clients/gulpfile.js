const gulp = require('gulp')
const path = require('path')

const browserify = require('browserify')
const vueify = require('vueify')
const babelify = require('babelify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const envify = require('envify/custom')

const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const concat = require('gulp-concat')
const autoprefixer = require('autoprefixer')
const cleancss = require('gulp-clean-css')
const uglify = require('gulp-uglify')

const jsEntities = {
  src: './src/',
  dest: '../public/js/',
  files: ['main.js']
}

const sassPaths = {
  srcDir: './src/sass/',
  dest: '../public/css/',
  bulma: 'node_modules/bulma/bulma.sass'
}

const distCssFile = 'style.min.css'

gulp.task('vue', (done) => {
  jsEntities.files.forEach(entry => {
    browserify(path.join(jsEntities.src, entry), {
      debug: true,
      extensions: ['.js', '.vue'],
      transform: [
        vueify,
        babelify.configure({ 'presets': ['env'] ,'plugins': ['transform-object-rest-spread']}),
        // Required in order to process node_modules files
        ['envify', {'global': true, NODE_ENV: process.env.NODE_ENV }]
      ]
    })
    .bundle()
    .on('error', err => {
      console.log(err.message)
      console.log(err.stack)
    })
    .pipe(source(entry))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(jsEntities.dest))
  })
  
  done()
})

gulp.task('scss', () => {
  return gulp.src([ sassPaths.bulma , sassPaths.srcDir + '**/*.scss'])
   .pipe(sass({
     style: 'compressed',
   }))
   .pipe(concat(distCssFile))
   .pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
   .pipe(cleancss())
   .pipe(gulp.dest(sassPaths.dest))
})

// ./src以下を監視する
gulp.task('watch', () => {
	var watcher = gulp.watch('./src/**/*.{js,vue}', gulp.parallel('vue','scss'))
	watcher.on('change', function(event) {})
})


// 並列処理
gulp.task('default', gulp.parallel('vue', 'scss', 'watch'))
