//Inicjalizacija gulp pluginova
var gulp = require('gulp'),
    compass = require('gulp-compass'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    gutil = require('gulp-util');

//Inicjalizacija varijabli foldera
var sassSources, outputPublic, jsSources, jsSourcesBootstrap, sassSourcesBootstrap, jsSourcesBootstrapjQuery;

//Definiranje varijabli foldera
jsSourcesBootstrap = ['components/libs/bootstrap-sass/assets/javascripts/**/*.js'];
jsSourcesBootstrapjQuery = ['components/libs/bootstrap-sass/jquery/**.js'];
sassSourcesBootstrap = ['components/libs/bootstrap-sass/assets/stylesheets/**/*.scss'];
outputPublic = ['public'];
sassSources = ['components/stylesheet/style.scss'];
jsSources = ['components/scripts/**/*.js'];

//POKRETANJE GULPA
gulp.task('default', ['sass', 'js','watch', 'browser-sync']);



//COMPASS - compile sass->css
gulp.task('sass', function(){
  gulp.src(sassSources)
    .pipe(compass({
      sass: 'components/stylesheet',
      style: 'expanded',
      comments: true
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest(outputPublic + '/css'))
    .pipe(browserSync.stream());
});

//CONCAT - spajanje JS u jedan script.js
gulp.task('js', function(){
    gulp.src(jsSources && jsSourcesBootstrap && jsSourcesBootstrapjQuery)
      .pipe(concat('script.js'))
      .pipe(gulp.dest(outputPublic + '/js'))
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
