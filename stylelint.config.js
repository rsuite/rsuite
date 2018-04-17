module.exports = {
  'extends': 'stylelint-config-standard',
  'rules': {
    // 覆盖 stylelint-config-standard 规则
    // `stylelint-config-standard`中的一些规则并不适用，这里进行了覆盖
    // ----------------------------------

    // 不检查函数之后是否有空白
    // style-lint 无法区分 less 的 mixin 还是 css function 这里直接禁用掉该检查项
    'function-whitespace-after': null,
    // 不允许小于1数字的前导零
    'number-leading-zero': 'never',

    // 扩充规则
    // - 启用了最严格的 vendor-prefix 限制，该限制会适用 {@link https://caniuse.com} 的数据进行判断
    // ----------------------------------

    // 禁止 at 规则（ @keyframes ）使用浏览器引擎前缀
    'at-rule-no-vendor-prefix': true,
    // 指定一个在声明中允许使用的属性和单位的白名单
    'declaration-property-unit-whitelist': {
      'font-size': ['px', 'em', '%'],
      '/^animation/': ['s'],
    },
    // 禁止 media 特性名称（ @media ）带有浏览器引擎前缀
    'media-feature-name-no-vendor-prefix': true,
    // 限制允许嵌套的深度
    'max-nesting-depth': [
      5, {
        // 忽略只包裹了其他规则，而且没有自己的声明块的 at 规则
        // {@link http://stylelint.cn/user-guide/rules/max-nesting-depth/#ignore-at-rules-without-declaration-blocks}
        ignore: ['at-rules-without-declaration-blocks']
      }
    ],
    // 不禁止低优先级的选择器出现在高优先级的选择器之后
    // [优先级的描述]{@link https://www.w3.org/TR/css3-selectors/#specificity}
    'no-descending-specificity': false,
    // 类选择器使用 snake case
    'selector-class-pattern': '^[a-z0-9]+(-?[a-z0-9]+)*$',
    // ID 选择器使用小驼峰命名
    'selector-id-pattern': '^([a-z]+([A-Z][a-z]+)?)$',
    // 禁止属性使用浏览器引擎前缀
    'property-no-vendor-prefix': true,
    // 限制复合选择器的数量
    'selector-max-compound-selectors': 6,
    // 限制 ID 选择器的数量
    'selector-max-id': 1,
    // 限制通配符（*）在一个选择器的数量
    'selector-max-universal': 1,
    // 禁止使用浏览器引擎前缀
    'selector-no-vendor-prefix': true,
    // 指定一个允许使用的伪类选择器的白名单(仅可使用 IE9+ 浏览器支持的伪类)
    // [CSS选择器的浏览器支持]{@link https://labs.qianduan.net/css-selector/}
    'selector-pseudo-class-whitelist': [
      // CSS 1
      'active',
      'link',
      'visited',
      // CSS 2.1
      'first-child',
      'focus',
      'hover',
      // CSS 3
      'checked',
      'disabled',
      'enabled',
      'empty',
      'first-of-type',
      'indeterminate',
      'last-child',
      'last-of-type',
      'not',
      'nth-child',
      'nth-last-child',
      'nth-of-type',
      'nth-last-of-type',
      'only-child',
      'only-of-type',
      'root',
      'target'
    ],
    // 字符串使用双引号
    'string-quotes': 'double',
    // 禁止给值添加浏览器引擎前缀
    'value-no-vendor-prefix': true,
  }
};

