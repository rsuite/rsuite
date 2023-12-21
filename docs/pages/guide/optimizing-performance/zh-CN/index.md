# 性能优化

对于大部分应用而言，React 已经在性能上做了大量工作，不需要我们为此做更多的事情，对此我们希望您先了解 [React 对性能优化的一些知识](https://zh-hans.reactjs.org/docs/optimizing-performance.html)。但是，当您的应用需要渲染大量元素的时候，这对于性能来任然是一个问题。在 React Suite 会站在用户业务场景的角度，为您提供一些有用的性能优化方案。

## 虚拟化长列表

在 React Suite 提供的组件中，Table、SelectPicker、CheckPicker、TreePicker、CheckTreePicker、Tree 等组件都支持“虚拟滚动”技术。如果您的应用使用了它们，只需要在使用组件时为它添加一个 `virtualized` 属性。 以下将通过 SelectPicker, Table 组件的虚拟滚动技术来演示。

<!--{include:`select-picker-virtualized.md`}-->
<!--{include:`table-virtualized.md`}-->

## 无限滚动加载数据

为了避免首次载入过多的数据，可以在用户向下滚动时即时获取数据。

<!--{include:`select-picker-infinite-loader.md`}-->
<!--{include:`table-infinite-loader.md`}-->

## 其他性能优化

- [最小化打包文件大小](/zh/guide/modularized/)：我们应该使得的编译后的文件尽可能的小，来提升用户体验。
