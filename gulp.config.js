module.exports = function () {
    var app = 'src/app/';
    //var homeViews = 'views/home/';

    var config = {
        index: 'index.html',
        htmlFiles :['*.html', 'app/components/**/*.html'],
        buildTarget: './dist',
        mainScss : './styles/main.scss',
        appScss: ['./app/**/*.scss'],
        stylesScss: ['./styles/**/*.scss', '!./styles/main.scss'],
        appCss: './dist/mooVtrailers.css',
        appJs: app + '/',
        testFiles : [ '*.js', './app/**/*.js', '!Gruntfile.js', '!gulpfile.js', '!gulp.config.js', '!bower_components/**', '!node_modules/**', '!config/**'],
        appName: 'mooVtrailers',

        bower: {
            json: require('./bower.json'),
            directory: './lib/',
            ignorePath: './',
            relative: true
        }
    };
    config.js = config.testFiles.concat(['app.js','!**/*_test.js']);

    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    return config;
};