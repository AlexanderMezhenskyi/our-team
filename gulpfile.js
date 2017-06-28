const gulp = require('gulp'); // Подключение гульпа
const postcss = require('gulp-postcss'); // Подключение PostCSS
const sourcemaps = require('gulp-sourcemaps');// Подключение Sourcemaps https://www.npmjs.com/package/gulp-sourcemaps
const autoprefixer = require('autoprefixer');// Подключение Autoprefixer https://github.com/postcss/autoprefixer
const cssnano = require('cssnano');// Подключение минификатора http://cssnano.co/

const sass = require('gulp-sass');// Подключение SCSS плагина для компилирования файлов

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


/**
 * Это описание задачи, которая будет переносить наши ассеты из исходников в папку dist
 * @returns {*}
 */
let publishApplication = (destinationDir) => {
    publishRootFiles(destinationDir);
    publishImages(destinationDir);
	publishJS(destinationDir);
	publishFonts(destinationDir);
	publishLib(destinationDir);
    publishCssAndAddBrowserPrefixes(destinationDir);
};
/**
 * Это описание задачи, которая будет переносить наши корневые файлы в папку dist
 * @returns {*}
 */
let publishRootFiles = (destinationDir) => {
    gulp.src(rootSources).pipe(gulp.dest(destinationDir))
};

/**
 * Это описание задачи, которая будет переносить наши картинкив папку dist
 * @returns {*}
 */
let publishImages = (destinationDir) => {
    gulp.src(imagesSources).pipe(gulp.dest(destinationDir +'assets/img'))
};

let publishJS = (destinationDir) => {
	gulp.src(jsSources).pipe(gulp.dest(destinationDir +'assets/scripts'))
};

/**
 * Это описание задачи, которая будет переносить наши фонты в папку dist
 * @returns {*}
 */
let publishFonts = (destinationDir) => {
	gulp.src(fontsSources).pipe(gulp.dest(destinationDir +'assets/fonts'))
};

/**
 * Это описание задачи, которая будет переносить наши libs в папку dist
 * @returns {*}
 */
let publishLib = (destinationDir) => {
	gulp.src(libSources).pipe(gulp.dest(destinationDir+'lib'));
	gulp.src(libSlickFontsSources).pipe(gulp.dest(destinationDir+'lib/fonts/'))
};

/**
 * Это описание задачи, которая будет переносить наш CSS из исходников в папку dist и при этом добавлять браузерные префиксы и мапы
 * @returns {*}
 */
let publishCssAndAddBrowserPrefixes = (destinationDir) => {
    let processors = [
        autoprefixer({
            remove: false, // указываем, что не нужно насильно удалять префиксы из нашего кода
        }),
        cssnano({
            discardUnused: {
                fontFace: false // отключаем удаление не используемых font-face
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

/**
 * Тут мы регистрируем нашу вышеописанную задачу publishRootFiles в гульпе
 */
gulp.task('publish', () => {
    return publishApplication('dist/')
});
/**
 * Тут мы регистрируем нашу вышеописанную задачу publishCssAndAddBrowserPrefixes в гульпе
 */
gulp.task('publish-css', () => {
    return publishCssAndAddBrowserPrefixes('dist/')
});

/**
 * Тут мы регистрируем нашу вышеописанную задачу publishLib в гульпе
 */
gulp.task('publish-lib', () => {
	return publishLib('src/')
});


/**
 * Тут мы добавляем файл вотчер, который будет запускать publishCssAndAddBrowserPrefixes задачу при изменении css файлов
 */
gulp.task('watch', () => {
    let destinationDir = 'src/';
    publishCssAndAddBrowserPrefixes(destinationDir);

    return gulp.watch([stylesheetsSources], () => publishCssAndAddBrowserPrefixes(destinationDir))
});

/**
 * Тут мы проставляем задачу по-умолчанию
 */
gulp.task('default', ['watch']);