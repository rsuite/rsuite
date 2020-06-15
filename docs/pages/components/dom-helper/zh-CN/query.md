### query

```typescript
getHeight: (node: HTMLElement, client: HTMLElement) => number;
getWidth: (node: HTMLElement, client: HTMLElement) => number;
getOffset: (node: HTMLElement) => Object;
getOffsetParent: (node: HTMLElement) => HTMLElement;
getPosition: (node: HTMLElement, offsetParent: HTMLElement) => Object;
contains: (context: HTMLElement, node: HTMLElement) => boolean;
```

<!--start-code-->

```js
class Demo extends React.Component {
  render() {
    return (
      <div>
        <a ref={ref => (this.node = ref)}>Node</a>
        <ButtonToolbar>
          <Button
            onClick={() => {
              alert(JSON.stringify(getOffset(this.node)));
            }}
          >
            getOffset
          </Button>

          <Button
            onClick={() => {
              alert(getOffsetParent(this.node));
            }}
          >
            getOffsetParent
          </Button>

          <Button
            onClick={() => {
              alert(JSON.stringify(getPosition(this.node)));
            }}
          >
            getPosition
          </Button>
        </ButtonToolbar>
      </div>
    );
  }
}

ReactDOM.render(<Demo />);
```

<!--end-code-->
