// Karma configuration
// Generated on Fri May 01 2015 23:19:52 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha','chai','sinon'],


    // list of files / patterns to load in the browser
    files: [

       'node_modules/angular/angular.js',
       'node_modules/angular-mocks/angular-mocks.js',
       'node_modules/sinon-chai/lib/sinon-chai.js',
       'node_modules/underscore/underscore.js',
       'node_modules/chai-fuzzy/index.js',
       './test/dimension-spect/store_double.js',
       './src/dimension/states_config.js',
       './src/dimension/ViewModel.js',
       './src/dimension/dimensions_model.js',
       './src/dimension/dimensions_view.js',  
       './src/dimension/dimensions_controller.js', 
       './src/dimension/module.js',           
       './test/dimension-spect/dataResponse.js',
       './test/dimension-spect/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
