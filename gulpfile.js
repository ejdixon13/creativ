var gulp = require('gulp')
    , sass = require('gulp-sass')
    , sourcemaps = require('gulp-sourcemaps')
    , autoprefixer = require('gulp-autoprefixer')
    , ngannotate = require('gulp-ng-annotate')
    , uglify = require('gulp-uglify')
    , stripdebug = require('gulp-strip-debug')
    , concat = require('gulp-concat')
    , browserSync = require('browser-sync')
    , config = require('./gulp.config')()
    , util = require('gulp-util')
    , watch = require('gulp-watch')
    , del = require('del')
    , add = require('gulp-add-src')
    , rename = require('gulp-rename')
    , plumber = require('gulp-plumber')
    , wiredep = require('wiredep')
    , plugins = require('gulp-load-plugins')()
    , runSequence = require('run-sequence')
    , handlebars = require('gulp-compile-handlebars')
    , version = require('./package.json').version
    , inject = require('gulp-inject')
    , ngtemplate = require('gulp-angular-templatecache');



/*******************************
 * ON ERROR
 * ****************************/
var onErrorGen = onErrorGenFunc;

/*******************************
 * END Tasks for ALM
 * ****************************/


gulp.task('default', ['prod'], function () {
    'use strict';
});

gulp.task('local', ['build'], function () {
    'use strict';

    console.log('Starting BrowserSync');
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.task('file-watch', ['templates'], function(){ runSequence('js', browserSync.reload); });

    gulp.task('watch', function(){
        watch([].concat(config.js, config.htmlFiles) , function(){ gulp.start('file-watch'); });
        watch([].concat(config.appScss, config.mainScss), {events : ['change']}, function(){ gulp.start('sass'); });
        watch([].concat(config.appScss, config.mainScss), {events : ['add', 'unlink']}, function(){ gulp.start('sass-inject'); });
    });
    gulp.start('watch');
});

/*******************************
 * Delete build folder
 * ****************************/
gulp.task('clean', function(cb) {
    return del([config.buildTarget], cb);
});


/*******************************
 * Make build folder
 * ****************************/
gulp.task('build', ['clean'], function (cb) {
    'use strict';
    console.log('Entered build phase');
    return runSequence('document-templates', 'lib', 'sass', 'templates', 'js', 'wiredep', cb);
});

/***************************************************************************
 * SASS
 * Convert app.scss file to css, cachebust and copy to build folder
 *
 * *************************************************************************/
gulp.task('sass', function () {
    'use strict';
    //manages all things css and sass.

    return gulp.src(config.mainScss)
        .pipe(plumber(onErrorGen))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(rename(config.appName + '.' + version + '.css'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(config.buildTarget))
        .pipe(browserSync.stream({match: '**/*.css'}));
});

/*****************************************************************************************************
 * SASS INJECT
 *****************************************************************************************************/
 gulp.task('sass-inject', function(){
    var target = gulp.src(config.mainScss);

    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src([
        config.appScss
    ], {read: false});

    return target.pipe(inject(sources, {starttag: '/* inject:imports */',
            endtag: '/* endinject */',
            transform: function(filepath){
                return '@import ".' + filepath + '";';
            }}))
        .pipe(gulp.dest('./styles'));
});

/***************************************************************************
 * JS
 * concats minifies, and uglifies all NON thirdparty js files and copies
 * to build folder ['unitTests']
 * *************************************************************************/
gulp.task('js', function () {
    'use strict';
    //build the final js output
    return gulp.src(config.js)
        .on('end', function(){ return del([config.buildTarget + '/generated']); })
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(ngannotate())
        .pipe(stripdebug())
        .pipe(add.append(config.buildTarget +'/generated/ngtemplates.js'))
        .pipe(concat(config.appName + '.' + version + '.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.buildTarget));
});

/*****************************************************************************************************
 * TEMPLATES
 * Injects all of my html templates into $templateCache.
 *****************************************************************************************************/
gulp.task('templates', function () {
    return gulp.src('./app/**/*-tpl.html')
        .pipe(ngtemplate('ngtemplates.js', {
            module: config.appName,
            root: 'app/'
        }))
        .pipe(gulp.dest(config.buildTarget + '/generated'));
});

/*****************************************************************************************************
 * WIREDEP
 * Injects scripts into our index.html file
 *****************************************************************************************************/
gulp.task('wiredep', function () {
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe(plugins.inject(gulp.src(config.js.concat(config.appCss)), { relative: true }))
        .pipe(gulp.dest('./'));
});

/*****************************************************************************************************
 * COPY Lib
 * copies lib folder to build
 *****************************************************************************************************/
 gulp.task('lib', function() {
     gulp.src(['./lib/**/*'])
         .pipe(gulp.dest(config.buildTarget+ '/lib'));
 });

/*****************************************************************************************************
 * DOCUMENT TEMPLATES
 *****************************************************************************************************/
 gulp.task('document-templates', function(){
     return gulp.src('*.html')
         .pipe(handlebars({
             'app-name': config.appName,
             'app-version': version
         }))

         .pipe( gulp.dest( config.buildTarget) );
 });

/******************************************************************************************
 * ERROR function
 * ****************************************************************************************/
function onErrorGenFunc(err) {
    util.beep();

    var error
        , message = util.colors.red('\n-----------------------------------');

    message += util.colors.red('\nSass Error!');
    message += util.colors.yellow('\n' + err.message);
    message += util.colors.yellow('\non line: ' + err.line + ' at character: ' + err.column);
    message += util.colors.white('\nin ' + err.file);
    message += util.colors.red('\n-----------------------------------');

    error = new util.PluginError('SASS', {
        message: message
    });

    console.log(error);
    this.emit('end');
}
