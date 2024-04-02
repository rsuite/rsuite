# 基础样式

当使用了 React Suite 后，会重置一些 HTML 元素的样式。您可以直接使用 HTML 元素进行排版，展示标题、段落、列表、链接等等。

> 如果不需要这些样式，可以[配置不引入这些样式][config-reset-import]。

<div id="ad-view"></div>

### `<a>`：HTML 锚元素

在组件中提供了 Button 可以创建一个`<a>`元素，同时您也可以在应用中直接使用 `<a>`元素，去可以创建通向其他网页、文件、同一页面内的位置、电子邮件地址或任何其他 URL 的超链接。

<!--{include:`anchor.md`}-->

### `<h1>`–`<h6>`：HTML 区域标题元素

下面的代码展示了所有可用的标题级别:

<!--{include:`heading.md`}-->

### `<p>`：HTML 段落元素

显示文本的一个段落。

<!--{include:`paragraph.md`}-->

### `<ul>`：HTML 无序列表元素

展示一个内可含多个元素的无序列表或项目符号列表。

<!--{include:`list-ul.md`}-->

### `<ol>`：HTML 有序列表项

展示一个有带编号的列表。

<!--{include:`list-ol.md`}-->

### `<dl>`：HTML 描述列表元素

是一个包含术语定义以及描述的列表，通常用于展示词汇表或者元数据 (键-值对列表)。

<!--{include:`list-dl.md`}-->

[config-reset-import]: /zh/guide/customization-less/#禁用-reset-相关样式引用
