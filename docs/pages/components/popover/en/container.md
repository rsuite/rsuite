### Container and prevent overflow

Positioned popover components in scrolling container

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

class Demo extends React.Component {
  render() {
    return (
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
  }
}

ReactDOM.render(<Demo />);
```

<!--end-code-->
