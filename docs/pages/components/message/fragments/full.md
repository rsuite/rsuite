<!--start-code-->

```js
import { Message, Placeholder } from 'rsuite';

const styles = {
  background: '#000',
  padding: 20,
  position: 'relative'
};

const App = () => (
  <div style={styles}>
    <Message full showIcon type="warning">
      Warning
    </Message>
    <Placeholder.Paragraph rows={10} />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
