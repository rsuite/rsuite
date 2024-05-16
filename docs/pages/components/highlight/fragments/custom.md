<!--start-code-->

```js
import { Highlight } from 'rsuite';

const App = () => {
  return (
    <Highlight
      query={['high quality', 'high performance']}
      renderMark={(match, index) => (
        <mark key={index} style={{ backgroundColor: '#f4f4f4', color: '#f00' }}>
          {match}
        </mark>
      )}
    >
      React Suite is a set of react components that have high quality and high performance.
    </Highlight>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
