'use strict';

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true
  },
  globals: {
    assert: true
  },
  parser: 'babel-eslint',
  plugins: ['react', 'babel', 'json', 'flowtype'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    indent: [ERROR, 2, { SwitchCase: 1 }], //规定代码的缩进方式：2个空格
    camelcase: ERROR, //强制驼峰法命名
    curly: ERROR, //必须使用 if(){} 中的{}
    eqeqeq: ERROR, //必须使用全等
    'brace-style': [ERROR, '1tbs'], //大括号风格
    quotes: [ERROR, 'single'], //引号类型
    semi: [ERROR, 'always'], //语句强制分号结尾
    'space-infix-ops': ERROR, //中缀操作符周围要不要有空格
    'no-param-reassign': OFF, //不允许对函数的形参进行赋值
    'prefer-spread': ERROR, //首选展开运算
    'comma-dangle': OFF, //不允许或强制在对象字面量或者数组属性的结尾使用逗号
    'padded-blocks': OFF, //规定代码块前后是否要加空行
    'prefer-const': OFF,
    'no-multi-spaces': ERROR,
    'no-var': OFF,
    'one-var': OFF,
    'class-methods-use-this': WARNING,
    'no-unused-expressions': [ERROR, { allowShortCircuit: true }],
    'arrow-parens': [ERROR, 'as-needed'],
    'no-mixed-operators': OFF,
    /**
     * https://github.com/airbnb/javascript/tree/master/react
     */
    'react/prefer-es6-class': [WARNING, 'always'], //使用 class extends React.Component
    'react/jsx-pascal-case': ERROR, //骆驼式命名
    'react/jsx-closing-bracket-location': ERROR, //JSX语法缩进/格式
    'react/jsx-curly-spacing': ERROR, //JSX {} 引用括号里两边加空格
    'react/jsx-boolean-value': [OFF, 'always'], //如果属性值为 true, 可以直接省略
    'jsx-quotes': [ERROR, 'prefer-double'], //JSX属性值总是使用双引号(")
    'react/no-string-refs': ERROR, //Refs里使用回调函数
    'react/jsx-wrap-multilines': ERROR, //多行的JSX标签写在 ()里
    'react/self-closing-comp': ERROR, //没有子元素的标签来说总是自己关闭标签
    'react/jsx-no-bind': ERROR, //当在 render() 里使用事件处理方法时，提前在构造函数里把 this 绑定上去
    'react/no-is-mounted': ERROR, //不要再使用 isMounted
    'react/prop-types': [ERROR, { ignore: ['children', 'className', 'style'] }],
    'jsx-a11y/href-no-hash': OFF,
    'jsx-a11y/label-has-for': OFF,
    'react/jsx-filename-extension': OFF,
    'react/prefer-stateless-function': OFF,
    'react/require-default-props': OFF,

    /**
     * Flowtype
     */
    'flowtype/define-flow-type': ERROR,
    'flowtype/require-valid-file-annotation': OFF,
    'flowtype/require-parameter-type': OFF,
    'flowtype/require-return-type': OFF,
    'flowtype/space-after-type-colon': OFF,
    'flowtype/space-before-type-colon': OFF,
    'flowtype/type-id-match': OFF,
    'flowtype/use-flow-type': ERROR
  }
};
