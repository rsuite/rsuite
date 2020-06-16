### DOMMouseMoveTracker

鼠标拖拽跟踪器

```typescript
new DOMMouseMoveTracker(
  onMove:(deltaX: number, deltaY: number, moveEvent: Object) => void,
  onMoveEnd:() => void,
  node: HTMLElement
);
```

<!--start-code-->

```js
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: 0,
      top: 0
    };
    this.onMove = this.onMove.bind(this);
    this.onMoveEnd = this.onMoveEnd.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }
  onMove(deltaX: number, deltaY: number) {
    const { left, top } = this.state;
    this.setState({
      left: left + deltaX,
      top: top + deltaY
    });
  }
  onMoveEnd() {
    if (this.mouseMoveTracker) {
      this.mouseMoveTracker.releaseMouseMoves();
    }
  }
  getMouseMoveTracker() {
    return (
      this.mouseMoveTracker || new DOMMouseMoveTracker(this.onMove, this.onMoveEnd, document.body)
    );
  }
  handleMouseDown(event) {
    this.mouseMoveTracker = this.getMouseMoveTracker();
    this.mouseMoveTracker.captureMouseMoves(event);
  }
  render() {
    const { left, top } = this.state;
    return (
      <div
        style={{
          position: 'relative'
        }}
      >
        {left}, {top}
        <Button
          appearance="primary"
          style={{
            position: 'absolute',
            left,
            top
          }}
          onMouseDown={this.handleMouseDown}
        >
          Drag me
        </Button>
      </div>
    );
  }
}

ReactDOM.render(<Demo />);
```

<!--end-code-->
