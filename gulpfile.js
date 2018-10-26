const gulp = require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');
const del = require('del');
const imagemin = require('gulp-imagemin');
const path = require('path');
const eslint = require('gulp-eslint');
const base64 = require('gulp-base64');

const srcPath = './src/**';
const distPath = './dist/';
const wxmlFiles = [
  `${srcPath}/*.wxml`,
  `!${srcPath}/_template/*.wxml`
];
const lessFiles = [
  `${srcPath}/*.less`,
  `!${srcPath}/styles/**/*.less`,
  `!${srcPath}/_template/*.less`
];
const jsonFiles = [
  `${srcPath}/*.json`,
  `!${srcPath}/_template/*.json`
];
const jsFiles = [
  `${srcPath}/*.js`,
  `!${srcPath}/_template/*.js`,
  `!${srcPath}/assets`,
  `!${srcPath}/assets/*`,
  `!${srcPath}/assets/**/*.js`
];
const imgFiles = [
  `${srcPath}/images/*.{png,jpg,gif,ico}`,
  `${srcPath}/images/**/*.{png,jpg,gif,ico}`
];

/* 清除dist目录 */
gulp.task('clean', done => {
  del.sync([
    'dist/*',
    '!dist/package.json',
    '!dist/package-lock.json',
    '!dist/miniprogram_npm',
    '!dist/miniprogram_npm/*',
    '!dist/node_modules',
    '!dist/node_modules/*'
  ]);
  done();
});

/* 编译iconfont文件 */
const iconfont = () => {
  return gulp
    .src('./src/assets/fonts/iconfont.css', {base: `./src/assets/fonts/`})
    .pipe(base64())
    .pipe(rename({ extname: '.less' }))
    .pipe(gulp.dest('./src/styles/'));
};
gulp.task(iconfont);

/* 编译wxml文件 */
const wxml = () => {
  return gulp
    .src(wxmlFiles, { since: gulp.lastRun(wxml) })
    .pipe(gulp.dest(distPath));
};
gulp.task(wxml);

/* 编译JS文件 */
const js = () => {
  return gulp
    .src(jsFiles, { since: gulp.lastRun(js) })
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulp.dest(distPath));
};
gulp.task(js);

/* 编译json文件 */
const json = () => {
  return gulp
    .src(jsonFiles, { since: gulp.lastRun(json) })
    .pipe(gulp.dest(distPath));
};
gulp.task(json);

/* 编译less文件 */
const wxss = () => {
  return gulp
    .src(lessFiles)
    .pipe(less())
    .pipe(rename({ extname: '.wxss' }))
    .pipe(gulp.dest(distPath));
};
gulp.task(wxss);

/* 编译压缩图片 */
const img = () => {
  return gulp
    .src(imgFiles, { since: gulp.lastRun(img)})
    .pipe(imagemin())
    .pipe(gulp.dest(distPath));
};
gulp.task(img);

/* build */
gulp.task(
  'build',
  gulp.series('clean', 'iconfont', gulp.parallel( 'wxml', 'js', 'json', 'img', 'wxss'))
);

/* watch */
gulp.task('watch', () => {
  let watchLessFiles = [...lessFiles];
  watchLessFiles.pop();
  gulp.watch(watchLessFiles, wxss);
  gulp.watch(jsFiles, js);
  gulp.watch(imgFiles, img);
  gulp.watch(jsonFiles, json);
  gulp.watch(wxmlFiles, wxml);
});

/* dev */
gulp.task('dev', gulp.series('build', 'watch'));

/**
 * auto 自动创建page or template or component
 *  -s 源目录（默认为_template)
 * @example
 *   gulp auto -p mypage           创建名称为mypage的page文件
 *   gulp auto -t mytpl            创建名称为mytpl的template文件
 *   gulp auto -c mycomponent      创建名称为mycomponent的component文件
 *   gulp auto -s index -p mypage  创建名称为mypage的page文件
 */
const auto = done => {
  const yargs = require('yargs')
    .example('gulp auto -p mypage', '创建名为mypage的page文件')
    .example('gulp auto -t mytpl', '创建名为mytpl的template文件')
    .example('gulp auto -c mycomponent', '创建名为mycomponent的component文件')
    .example(
      'gulp auto -s index -p mypage',
      '复制pages/index中的文件创建名称为mypage的页面'
    )
    .option({
      s: {
        alias: 'src',
        default: '_template',
        describe: 'copy的模板',
        type: 'string'
      },
      p: {
        alias: 'page',
        describe: '生成的page名称',
        conflicts: ['t', 'c'],
        type: 'string'
      },
      t: {
        alias: 'template',
        describe: '生成的template名称',
        type: 'string',
        conflicts: ['c']
      },
      c: {
        alias: 'component',
        describe: '生成的component名称',
        type: 'string'
      },
      version: { hidden: true },
      help: { hidden: true }
    })
    .fail(msg => {
      done();
      console.error('创建失败!!!');
      console.error(msg);
      console.error('请按照如下命令执行...');
      yargs.parse(['--msg']);
      return;
    })
    .help('msg');

  const argv = yargs.argv;
  const source = argv.s;
  const typeEnum = {
    p: 'pages',
    t: 'templates',
    c: 'components'
  };
  let hasParams = false;
  let name, type;
  for (let key in typeEnum) {
    hasParams = hasParams || !!argv[key];
    if (argv[key]) {
      name = argv[key];
      type = typeEnum[key];
    }
  }

  if (!hasParams) {
    done();
    yargs.parse(['--msg']);
  }

  const root = path.join(__dirname, 'src', type);
  let dirname = name, basename = name;

  if (name.indexOf('/') > -1) {
    let pathLastIndex = name.lastIndexOf('/');
    dirname = name.substr(0, pathLastIndex);
    basename = name.substr(pathLastIndex + 1);
  }

  return gulp
    .src(path.join(root, source, '*.*'))
    .pipe(
      rename({
        dirname: dirname,
        basename: basename
      })
    )
    .pipe(gulp.dest(path.join(root)));
};
gulp.task(auto);
