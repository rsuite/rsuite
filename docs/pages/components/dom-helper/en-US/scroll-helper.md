### scroll

```typescript
scrollLeft: (node: HTMLElement) => number;
scrollLeft: (node: HTMLElement, value: number) => void;

scrollTop: (node: HTMLElement) => number;
scrollTop: (node: HTMLElement, value: number) => void;
```

<!--start-code-->

```js
class Demo extends React.Component {
  render() {
    return (
      <div>
        <ButtonToolbar>
          <Button
            onClick={() => {
              scrollTop(window, 1500);
            }}
          >
            scrollTop 1500
          </Button>

          <Button
            onClick={() => {
              alert(scrollTop(window));
            }}
          >
            get scrollTop
          </Button>
        </ButtonToolbar>
      </div>
    );
  }
}

ReactDOM.render(<Demo />);
```

<!--end-code-->
