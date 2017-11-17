> 模板使用： [**React Static Boilerplate**](https://github.com/kriasoft/react-static-boilerplate)。发布地址：https://perspicere.github.io/PerspicereMagazine/
> 设计：https://modao.cc/workspace/apps/pD085D5F0A01503243168249

### update 2017-11-16

1. 加入[PerspicereContent](https://github.com/Perspicere/PerspicereContent)项目用于存放每期杂志内容。该项目会由运营负责更新。
2. 在redux store中加入issues Class, 负责通过github API从[PerspicereContent](https://github.com/Perspicere/PerspicereContent)中抽取内容，并返回包含内容的promise。函数getAbstracts返回redux使用的config文件。

TODO:
* 让issues Class写入浏览器cache（可能通过redux store），这样刷新之后issues不需要重新进行抓取。
* 在redux中加入Promise异步处理机制。
* 去掉material-ui组件。
* 使用github app token，增加api使用次数上限。

### update 2017-10-03

1. 添加导航页
2. 重构。 由于layout header等组件和业务数据联系紧密，后面也可能有不同视图，从components移出各自作为独立的模块
3. redux的对应关系：store目录放各个模块的数据配置以及reducer；pages目录下则以模块为单位放 container component actions
  

### update 2017-10-01

1. 使用redux store管理期刊数据，配置页面
2. 创建了三个文件夹
```
  articles  放纯粹的markdown文件
  resources 放通用图片资源和文章涉及的图片  放到一个文件夹方便优化和未来放CDN
    每一期的图片文件放到一个文件夹
  store
    存放主页的配置，以及每一期的文章配置， 包括封面图片简介等等
    基于redux机制 实现数据和视图分离
```
3. 目前pages目录一个文件夹即一个模块
    其中包含container，本模块业务相关的component，css等，
    而components存放通用组件  
4. 目前文章的图片资源是从docs目录复制过来的，但二者含义不同。 docs可以放任何栏目相关的的原始资料，
    而resources的期刊目录，则放展示到页面的，会在mark down等地方引用   
  

### 包含功能

&nbsp; &nbsp; ✓ Modern JavaScript syntax ([ES2015](http://babeljs.io/docs/learn-es2015/)+) via [Babel](http://babeljs.io/), modern CSS syntax via [PostCSS](https://github.com/postcss/postcss)<br>
&nbsp; &nbsp; ✓ Component-based UI architecture via [React](http://facebook.github.io/react/), [Webpack](https://webpack.github.io/) and [CSS Modules](https://github.com/css-modules/css-modules)<br>
&nbsp; &nbsp; ✓ Application state management /w time-travel debugging via [Redux](http://redux.js.org/) (see [`main.js`](main.js), [`core/store.js`](core/store.js))<br>
&nbsp; &nbsp; ✓ Routing and navigation via [`path-to-regexp`](https://github.com/pillarjs/path-to-regexp) and [`history`](https://github.com/mjackson/history) (see [`main.js`](main.js), [`core/router.js`](core/router.js), [`utils/routes-loader.js`](utils/routes-loader.js))<br>
&nbsp; &nbsp; ✓ [Code-splitting](https://github.com/webpack/docs/wiki/code-splitting) and async chunk loading via [Webpack](https://webpack.github.io/) and [ES6 System.import()](http://www.2ality.com/2014/09/es6-modules-final.html)<br>
&nbsp; &nbsp; ✓ Hot Module Replacement ([HMR](https://webpack.github.io/docs/hot-module-replacement.html)) /w [React Hot Loader](http://gaearon.github.io/react-hot-loader/)<br>
&nbsp; &nbsp; ✓ Cross-device testing with [Browsersync](https://browsersync.io/) (see [`run.js#start`](run.js))<br>
&nbsp; &nbsp; ✓ **24/7** community support on [Gitter](https://gitter.im/kriasoft/react-static-boilerplate); customization requests on [Codementor](https://www.codementor.io/koistya)<br>


### 文件树

```shell
.
├── /components/                # Shared or generic UI components
│   ├── /Button/                # Button component
│   ├── /Layout/                # Website layout component
│   ├── /Link  /                # Link component to be used insted of <a>
│   └── /...                    # etc.
├── /core/                      # Core framework
│   ├── /history.js             # Handles client-side navigation
│   ├── /router.js              # Handles routing and data fetching
│   └── /store.js               # Application state manager (Redux)
├── /node_modules/              # 3rd-party libraries and utilities
├── /pages/                     # React components for web pages
│   ├── /about/                 # About page
│   ├── /error/                 # Error page
│   ├── /home/                  # Home page
│   └── /...                    # etc.
├── /public/                    # Static files such as favicon.ico etc.
│   ├── /dist/                  # The folder for compiled output
│   ├── favicon.ico             # Application icon to be displayed in bookmarks
│   ├── robots.txt              # Instructions for search engine crawlers
│   └── /...                    # etc.
├── /test/                      # Unit and integration tests
├── /utils/                     # Utility and helper classes
│── main.js                     # React application entry point
│── package.json                # The list of project dependencies and NPM scripts
│── routes.json                 # This list of application routes
│── run.js                      # Build automation script, e.g. `node run build`
└── webpack.config.js           # Bundling and optimization settings for Webpack
```

### 使用

**启动**

```shell
$ node run                      # Same as `npm start` or `node run start`
```

启动发布模式： `node run start --release` ，也可以取消 HMR与React Hot Loader：`node run start --no-hmr`。应用的地址会在[http://localhost:3000/](http://localhost:3000/).


### 测试

单元测试通过 [chai](http://chaijs.com/) 与 [mocha](http://mochajs.org/)进行。

```shell
$ npm run lint                  # Check JavaScript and CSS code for potential issues
$ npm run test                  # Run unit tests. Or, `npm run test:watch`
```


### 部署
发布：
```shell
$ node run publish              # Build and publish the website to Firebase, same as `npm run publish`
```
网站会发布在https://perspicere.github.io/PerspicereMagazine/。如果仅仅需要构建：
```shell
$ node run build                # Or, `node run build --release` for production build
```

### 更行模板

```shell
$ git checkout master
$ git fetch react-static-boilerplate
$ git merge react-static-boilerplate/master
$ npm install
```
