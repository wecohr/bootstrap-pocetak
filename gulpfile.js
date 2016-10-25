//Inicjalizacija gulp pluginova
var gulp = require('gulp'),
    compass = require('gulp-compass'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util');

//Inicjalizacija varijabli foldera
var sassSources, outputPublic, jsSources;

//Definiranje varijabli foldera
outputPublic = ['public'];
sassSources = ['components/stylesheet/**/*.scss'];
jsSources = ['components/stylesheet/scripts/*.js'];


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
});

//CONCAT - spajanje JS u jedan script.js
gulp.task('js', function(){
    gulp.src(jsSources)
      .pipe(concat('script.js'))
      .pipe(gulp.dest(outputPublic + '/js'))

});

//WATCH TASK - pracenje promjena i pokretanje funkcija
gulp.task('watch', function(){
  gulp.watch(sassSources, ['sass']);
  gulp.watch(jsSources, ['js']);
});

//POKRETANJE GULPA
gulp.task('default', ['sass', 'js','watch']);
