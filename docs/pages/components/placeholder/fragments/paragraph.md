<!--start-code-->

```js
import { Placeholder } from 'rsuite';

const App = () => (
  <>
    <p>Default:</p>
    <Placeholder.Paragraph style={{ marginTop: 30 }} />
    <hr />
    <p>You can also add a round or square icon to the left:</p>
    <Placeholder.Paragraph style={{ marginTop: 30 }} graph="circle" />
    <Placeholder.Paragraph style={{ marginTop: 30 }} graph="square" />
    <Placeholder.Paragraph style={{ marginTop: 30 }} graph="image" />
    <hr />
    <p>You can also customize the number of lines, spacing, etc.:</p>
    <Placeholder.Paragraph style={{ marginTop: 30 }} rows={5} graph="image" active />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
