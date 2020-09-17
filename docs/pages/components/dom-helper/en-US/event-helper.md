### events

```typescript
on: (target: HTMLElement, eventName: string, listener: Function, capture: boolean = false) => {off: Function};
off: (target: HTMLElement, eventName: string, listener: Function, capture: boolean = false) => void;
```

<!--start-code-->

```js
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnEvent = this.handleOnEvent.bind(this);
    this.handleOffEvent = this.handleOffEvent.bind(this);
  }
  handleOnEvent() {
    if (!this.listener) {
      this.listener = on(this.btn, 'click', () => {
        alert('click');
      });
    }
  }
  handleOffEvent() {
    if (this.listener) {
      this.listener.off();
      this.listener = null;
    }
  }
  render() {
    return (
      <div>
        <div>
          <button
            ref={ref => {
              this.btn = ref;
            }}
          >
            click me
          </button>
        </div>
        <hr />
        <ButtonToolbar>
          <Button onClick={this.handleOnEvent}>on</Button>
          <Button onClick={this.handleOffEvent}>off</Button>
        </ButtonToolbar>
      </div>
    );
  }
}

ReactDOM.render(<Demo />);
```

<!--end-code-->
