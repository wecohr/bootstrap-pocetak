//Inicjalizacija gulp pluginova
var gulp = require('gulp'),
    compass = require('gulp-compass'),
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
      style: expanded,
      comments: true
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest(outputPublic + 'css'))
});
