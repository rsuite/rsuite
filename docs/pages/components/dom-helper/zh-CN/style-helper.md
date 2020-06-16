### style

```typescript
addStyle: (node: HTMLElement, property: string, value: string) => void;
addStyle: (node: HTMLElement, style: Object) => void;

removeStyle: (node: HTMLElement, property: string) => void;
removeStyle: (node: HTMLElement, propertys: Array<string>) => void;

getStyle: (node: HTMLElement, property: string) => string;
getStyle: (node: HTMLElement) => Object;


translateDOMPositionXY: (style: Object, x: number, y: number) => Object;

```

<!--start-code-->

```js
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      html: '<div class="view"></div>'
    };
  }
  showView() {
    const html = this.container.innerHTML;
    this.setState({ html });
  }
  render() {
    const { html } = this.state;
    return (
      <div>
        <div> {html}</div>
        <div
          ref={ref => {
            this.container = ref;
          }}
        >
          <div
            className="view"
            ref={ref => {
              this.view = ref;
            }}
          />
        </div>
        <hr />
        <ButtonToolbar>
          <Button
            onClick={() => {
              addStyle(this.view, {
                'font-size': '16px',
                color: '#F00'
              });
              this.showView();
            }}
          >
            addStyle
          </Button>

          <Button
            onClick={() => {
              removeStyle(this.view, ['font-size', 'color']);
              this.showView();
            }}
          >
            removeStyle
          </Button>

          <Button
            onClick={() => {
              console.log(getStyle(this.view));
              alert(getStyle(this.view, 'font-size'));
            }}
          >
            getStyle
          </Button>
        </ButtonToolbar>
      </div>
    );
  }
}

ReactDOM.render(<Demo />);
```

<!--end-code-->
