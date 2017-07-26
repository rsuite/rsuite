# 代码约定

RSUITE 组件开发将遵循以下约定

## 版本管理

### 版本号
命名规范： `主版本号.子版本号[.修正版本号 -[ 后缀 ]]`

例如：1.2.5 , 2.0.0-alpha-4


### 版本兼容


```js
"peerDependencies": {
  "react": "^0.14.9 || >=15.3.0",
  "react-dom": "^0.14.9 || >=15.3.0"
}
```

## 分支管理
- master 主分支，放当前 `npm` 库最新的代码分支
- next 下一个大版本的代码分支，伴随着主版本号会更新
- gh-pages 文档的分支
- 其他分支不受限制



## 代码规范

所有编辑器采用 EditorConfig 进行代码格式管理， `.editorconfig` 配置如下:

```ini
# editorconfig.org

root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
insert_final_newline = false
```

代码语法检查才 `ESlint`, 并基础 `airbnb` 编码规范

- [JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)

`.eslintrc.js` 配置文件参考: [eslintrc](https://gist.github.com/simonguo/1d6c698d5c91c082e73f79f5bc978cae#file-eslintrc-js)





## 测试

为了保证组件的质量，必须写测试用例， 测试工具不限制，推荐使用 `karma` ,`mocha`, `sinon`, `chai`。
另外并配置 `travis-ci`, 并在 README 中显示状态


## 文档

每一个组件必须具备可以在线访问的文档，文档的内容包括:

- 组件概述: 说明组件的特性，和快速使用的示例代码；
- 功能示例: 把特性中包含的功能，每一个都需要展示出示例和代码；
- API 说明: 对组件的所有属性详细说明；

> 参考[rsuite-table](https://rsuitejs.com/rsuite-table)

