<!--start-code-->

```js
import { Tabs, Placeholder } from 'rsuite';
import { FaRegSquare, FaImage, FaRegCircle } from 'react-icons/fa';

const App = () => (
  <Tabs defaultActiveKey="1">
    <Tabs.Tab eventKey="1" title="Image" icon={<FaImage />}>
      <Placeholder.Paragraph graph="image" />
    </Tabs.Tab>
    <Tabs.Tab eventKey="2" title="Square" icon={<FaRegSquare />}>
      <Placeholder.Paragraph graph="square" />
    </Tabs.Tab>
    <Tabs.Tab eventKey="3" title="Circle" icon={<FaRegCircle />}>
      <Placeholder.Paragraph graph="circle" />
    </Tabs.Tab>
  </Tabs>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
