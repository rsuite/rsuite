### Order

<!--start-code-->

```js
const instance = (
  <div className="show-grid">
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={4} order={4}>
        order={4}
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4} order={3}>
        order={3}
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4} order={2}>
        order={2}
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4} order={1}>
        order={1}
      </FlexboxGrid.Item>
    </FlexboxGrid>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
