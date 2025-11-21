<!--start-code-->

```js
import { Uploader, Button } from 'rsuite';

const fileList = [
  {
    name: 'A puppy sleeping on its belly',
    fileKey: 1,
    url: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=265'
  },
  {
    name: 'A puppy looking at me with big eyes',
    fileKey: 2,
    url: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=300'
  }
];
const App = () => (
  <Uploader
    listType="picture-text"
    defaultFileList={fileList}
    action="//jsonplaceholder.typicode.com/posts/"
  >
    <Button>Select files...</Button>
  </Uploader>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
