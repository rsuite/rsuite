

# RSUITE

------

RSUITE  `[ɑː(r)swiːt]` 是一套基于 React 开发的 UI 组件库，产生于 HYPERS 前端团队，是面向企业级后台产品的一套前端解决方案。

RSUITE 目标就是让 WEB 开发更快捷，同时具有一定的灵活性和扩展性，致力于改善前端工程师的开发体验。


------
版本与状态

[![npm](https://badge.fury.io/js/rsuite.svg)](https://www.npmjs.com/package/rsuite)
[![Travis](https://travis-ci.org/rsuite/rsuite.svg?branch=master)](https://travis-ci.org/rsuite/rsuite)
[![Coverage Status](https://coveralls.io/repos/github/rsuite/rsuite/badge.svg?branch=next)](https://coveralls.io/github/rsuite/rsuite?branch=next)

[![codebeat badge](https://codebeat.co/badges/847f629e-1fdc-4b87-9411-e2ae8e3132d6)](https://codebeat.co/projects/github-com-rsuite-rsuite-next)


社区

[![Discord](https://img.shields.io/badge/Discord-Join%20chat%20%E2%86%92-738bd7.svg)](https://discord.gg/GmPXTH3)




## 快速开始

<br/>
安装:

```
npm i rsuite --save
```


示例：

```js
import { Button } from 'rsuite';

ReactDOM.render(<Button>Button</Button>, mountNode);
```


## 创建一个 RSUITE 应用

通过 `create-rsuite-app` 快速创建一个 RSUITE 应用。  另外，应用中还集成了以下内容:

- `Redux`: 数据流管理
- `React Router`: 路由管理
- `React Intl`: 国际化
- `ESLint`: 代码检查
- `Webpack`: 应用构建及开发环境搭建
- `Babel`: 代码编译

详细参考 [dependencies](https://github.com/rsuite/create-rsuite-app/blob/master/generators/app/templates/package.json#L12-L33)

安装:

```
npm i -g yo
npm i -g generator-create-rsuite-app
```

创建项目:

```
# 创建并进入项目文件夹
mkdir your-project && cd your-project

// 使用脚手架安装项目
yo create-rsuite-app
```

运行项目:

等待 `npm install`  安装完成后，执行下面命令，打开 `localhost:3002` 即可运行项目。

```
npm run dev
```

> 使用中如果存在问题，提交 [issues](https://github.com/rsuite/create-rsuite-app/issues/new)

## 主题相关



- 方式 1 ：引用 less 文件

```less
// 如果需要使用一些拓展组件，应该引入组件样式
@import "~rsuite-table/lib/less/index";

// 引入 RSUITE 样式
@import "~rsuite-theme/dist/less/rsuite";

// 修改主题颜色,不设置则使用 RSUITE 默认颜色
@base-color: #6292f0;

// 可以修改主题中的变量参数，来自定义自己的主题
// 参考 https://github.com/rsuite/rsuite-theme/blob/master/src/less/variables.less
```

- 方式 2 : CDN

```html
<link rel="stylesheet" href="https://unpkg.com/rsuite-theme/dist/css/rsuite.min.css" />
```

- 其他详细配置参考 [rsuite-theme](https://rsuitejs.com/components/theme)


> 使用中如果存在问题，提交 [issues](https://github.com/rsuite/rsuite-theme/issues/new)
