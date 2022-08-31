# Optimizing Performance

For many applications, React has already done a lot of work on performance, and we don't need to do more for this, and we hope you have some knowledge of [React's performance optimization](https://reactjs.org/docs/optimizing-performance.html) first. However, when your application needs to render a large number of elements, this can still be an issue for performance. In React Suite, we will provide you with some useful performance optimization solutions from the perspective of user business scenarios.

## Virtualize Long Lists

Among the components provided by React Suite, Table, SelectPicker, CheckPicker, TreePicker, CheckTreePicker, Tree and other components support a technique known "windowing". If your app uses them, just add a `virtualized` attribute to the component when using it. The following will demonstrate through the SelectPicker and Table components.

<!--{include:<components/select-picker/fragments/virtualized.md>}-->
<!--{include:<components/table/fragments/virtualized.md>}-->

## Infinite Loader

To avoid loading too much data the first time, it can be designed to fetch data instantly as the user scrolls down.

<!--{include:<components/select-picker/fragments/infinite-loader.md>}-->
<!--{include:<components/table/fragments/infinite-loader.md>}-->

## Other Optimizing Performance

- [Minimizing Bundle Size](/zh/guide/modularized/)：We should make the compiled files as small as possible to improve user experience.
