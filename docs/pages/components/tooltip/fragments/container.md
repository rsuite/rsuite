<!--start-code-->

```js
/**
 *  PreventOverflowContainer from
 *  https://github.com/rsuite/rsuite/blob/master/docs/components/PreventOverflowContainer.tsx
 */

const speaker = (
  <Tooltip style={{ width: 120 }}>
    This is a <i>tooltip</i> .
  </Tooltip>
);

class Demo extends React.Component {
  render() {
    return (
      <PreventOverflowContainer height={300}>
        {getContainer => (
          <Whisper
            controlId="control-id-container"
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
