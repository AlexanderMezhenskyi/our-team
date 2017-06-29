const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const sass = require('gulp-sass');

const stylesheetsSources = './src/assets/stylesheets/**/*.scss';

const rootSources = ['./src/*.html', './src/*.png'];
const imagesSources = './src/assets/img/**/*';
const jsSources = './src/assets/scripts/**/*';
const fontsSources = './src/assets/fonts/**/*';

const libSources = ['./node_modules/jquery/dist/jquery.min.js',
                    './node_modules/slick-carousel/slick/slick.min.js',
	                './node_modules/slick-carousel/slick/slick.css',
	                './node_modules/slick-carousel/slick/slick-theme.css',
	                './node_modules/slick-carousel/slick/ajax-loader.gif'];

const libSlickFontsSources = './node_modules/slick-carousel/slick/fonts/*';

const sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};



let publishApplication = (destinationDir) => {
    publishRootFiles(destinationDir);
    publishImages(destinationDir);
	publishJS(destinationDir);
	publishFonts(destinationDir);
	publishLib(destinationDir);
    publishCssAndAddBrowserPrefixes(destinationDir);
};

let publishRootFiles = (destinationDir) => {
    gulp.src(rootSources).pipe(gulp.dest(destinationDir))
};


let publishImages = (destinationDir) => {
    gulp.src(imagesSources).pipe(gulp.dest(destinationDir +'assets/img'))
};

let publishJS = (destinationDir) => {
	gulp.src(jsSources).pipe(gulp.dest(destinationDir +'assets/scripts'))
};


let publishFonts = (destinationDir) => {
	gulp.src(fontsSources).pipe(gulp.dest(destinationDir +'assets/fonts'))
};


let publishLib = (destinationDir) => {
	gulp.src(libSources).pipe(gulp.dest(destinationDir+'lib'));
	gulp.src(libSlickFontsSources).pipe(gulp.dest(destinationDir+'lib/fonts/'))
};


let publishCssAndAddBrowserPrefixes = (destinationDir) => {
    let processors = [
        autoprefixer({
            remove: false,
        }),
        cssnano({
            discardUnused: {
                fontFace: false
            }
        }),
    ];

    return gulp.src(stylesheetsSources)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(destinationDir + 'assets/stylesheets'))
};


gulp.task('publish', () => {
    return publishApplication('dist/')
});

gulp.task('publish-css', () => {
    return publishCssAndAddBrowserPrefixes('dist/')
});


gulp.task('publish-lib', () => {
	return publishLib('src/')
});


gulp.task('watch', () => {
    let destinationDir = 'src/';
    publishCssAndAddBrowserPrefixes(destinationDir);

    return gulp.watch([stylesheetsSources], () => publishCssAndAddBrowserPrefixes(destinationDir))
});


gulp.task('default', ['watch']);