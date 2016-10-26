//Inicjalizacija gulp pluginova
var gulp = require('gulp'),
    compass = require('gulp-compass'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    gutil = require('gulp-util');

//Inicjalizacija varijabli foldera
var sassSources, outputPublic,sassSource, jsSources, jsSourcesBootstrap, sassSourcesBootstrap, jsSourcesBootstrapjQuery;

//Definiranje varijabli foldera
jsSourcesBootstrap = ['components/libs/bootstrap-sass/assets/javascripts/bootstrap.js'];
jsSourcesBootstrapjQuery = ['components/libs/jquery/dist/jquery.js'];
sassSourcesBootstrap = ['components/libs/bootstrap-sass/assets/stylesheets/**/*.scss'];
outputPublic = ['public'];
sassSource = ['components/stylesheet/style.scss'];
sassSources = ['components/stylesheet/**/*.scss'];
jsSources = ['components/scripts/**/*.js'];

//POKRETANJE GULPA
gulp.task('default', ['sass', 'jqueryjs' ,'bootstrapjs','watch', 'browser-sync']);



//COMPASS - compile sass->css
gulp.task('sass', function(){
  gulp.src(sassSource)
    .pipe(compass({
      sass: 'components/stylesheet',
      style: 'expanded',
      comments: true
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest(outputPublic + '/css'))
    .pipe(browserSync.stream());
});

//CONCAT BOOTSTRAP- spajanje JS u jedan script.js
gulp.task('bootstrapjs', function(){
    gulp.src(jsSourcesBootstrap)
      .pipe(concat('bootstrap.js'))
      .pipe(gulp.dest(outputPublic + '/js/'))
      .pipe(browserSync.stream());
});

//CONCAT JQUERY - spajanje JS u jedan script.js
gulp.task('jqueryjs', function(){
    gulp.src(jsSourcesBootstrapjQuery)
      .pipe(concat('jquery.js'))
      .pipe(gulp.dest(outputPublic + '/js/'))
      .pipe(browserSync.stream());
});

//WATCH TASK - pracenje promjena i pokretanje funkcija
gulp.task('watch', function(){
  gulp.watch(sassSources, ['sass']);
  gulp.watch(jsSources, ['js']);
  gulp.watch(outputPublic + '/*.html').on('change', browserSync.reload);
});

//BROWSER-SYNC
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: outputPublic,
            livereload: true
        }
    });
});
