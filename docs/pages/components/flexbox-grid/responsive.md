### 响应式

与 `<Col>` 组件结合可以实现响应式。

<!--start-code-->

```js
const instance = (
  <div className="show-grid">
    <FlexboxGrid justify="space-around">
      <FlexboxGrid.Item componentClass={Col} colspan={24} md={6}>
        colspan={24} md={6}
      </FlexboxGrid.Item>
      <FlexboxGrid.Item componentClass={Col} colspan={24} md={6}>
        colspan={24} md={6}
      </FlexboxGrid.Item>
      <FlexboxGrid.Item componentClass={Col} colspan={24} md={6} smHidden>
        colspan={24} md={6} smHidden
      </FlexboxGrid.Item>
    </FlexboxGrid>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
