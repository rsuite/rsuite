### 容器与防止溢出

`Popover` 会渲染在容器内部，跟随按钮一起滚动。

<!--start-code-->

```js
/**
 *  PreventOverflowContainer from
 *  https://github.com/rsuite/rsuite/blob/master/docs/components/PreventOverflowContainer.tsx
 */

const speaker = (
  <Popover title="Title" style={{ width: 200 }}>
    <p>This is a defalut Popover </p>
    <p>Content</p>
  </Popover>
);

const App = () => (
  <PreventOverflowContainer height={300}>
    {getContainer => (
      <Whisper
        preventOverflow
        trigger="click"
        container={getContainer}
        speaker={speaker}
        placement="auto"
      >
        <Button appearance="primary">Click</Button>
      </Whisper>
    )}
  </PreventOverflowContainer>
);

ReactDOM.render(<App />);
```

<!--end-code-->
