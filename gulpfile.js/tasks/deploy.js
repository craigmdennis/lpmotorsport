var config  = require('../config')
var ghPages = require('gulp-gh-pages')
var gulp    = require('gulp')
var open    = require('open')
var os      = require('os')
var package = require('../../package.json')
var path    = require('path')

var settings = {
  url: package.homepage,
  src: path.join(config.root.public, '/**/*'),
  ghPages: {
    // cacheDir: path.join(os.tmpdir(), package.name)
    force: true
  }
}

var deployTask = function() {
  return gulp.src(settings.src)
    .pipe(ghPages(settings.ghPages))
    .on('end', function(){
      open(settings.url)
    })
}

gulp.task('deploy', deployTask)
module.exports = deployTask
