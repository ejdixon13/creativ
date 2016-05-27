module.exports = function () {
    var app = 'src/app/';
    //var homeViews = 'views/home/';

    var config = {
        //homeViews: homeViews,
        //index: homeViews + 'index.cshtml',
        index: 'index.html',
        htmlFiles :['*.html', 'app/components/**/*.html'],
        buildTarget: './dist',
        mainScss : './styles/main.scss',
        appScss: './app/**/*.scss',
        appCss: './dist/mooVtrailers.css',
        appJs: app + '/',
        testFiles : testFiles = [
            '*.js'
            , './app/**/*.js'
            , '!Gruntfile.js'
            , '!gulpfile.js'
            , '!gulp.config.js'
            , '!bower_components/**'
            , '!node_modules/**'
            , '!config/**'
        ],
        js : [].concat(this.testFiles, ['app.js','!**/*_test.js']),
        appName: 'mooVtrailers',

        bower: {
            json: require('./bower.json'),
            directory: './lib/',
            ignorePath: './',
            relative: true
        }
    };

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