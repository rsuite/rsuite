<!--start-code-->

```js
import { Affix, Button, Placeholder } from 'rsuite';

const App = () => {
  const container = React.useRef();
  return (
    <>
      <div ref={container} style={{ background: 'black' }}>
        <Placeholder.Paragraph rows={6} />
        <Affix
          top={0}
          container={() => {
            return container.current;
          }}
        >
          <Button appearance="primary" style={{ marginLeft: 100 }}>
            Top 0
          </Button>
        </Affix>
        <Placeholder.Paragraph rows={6} />
      </div>
      <Placeholder.Paragraph rows={20} />
    </>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
