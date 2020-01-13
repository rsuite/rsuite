### class

```typescript
hasClass: (node: HTMLElement, className: string) => boolean;
addClass: (node: HTMLElement, className: string) => HTMLElement;
removeClass: (node: HTMLElement, className: string) => HTMLElement;
toggleClass: (node: HTMLElement, className: string) => HTMLElement;
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
              addClass(this.view, 'custom');
              this.showView();
            }}
          >
            addClass
          </Button>

          <Button
            onClick={() => {
              removeClass(this.view, 'custom');
              this.showView();
            }}
          >
            removeClass
          </Button>

          <Button
            onClick={() => {
              toggleClass(this.view, 'custom');
              this.showView();
            }}
          >
            toggleClass
          </Button>
          <Button
            onClick={() => {
              alert(hasClass(this.view, 'custom'));
            }}
          >
            hasClass
          </Button>
        </ButtonToolbar>
      </div>
    );
  }
}

ReactDOM.render(<Demo />);
```

<!--end-code-->
