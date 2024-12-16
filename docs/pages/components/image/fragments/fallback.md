<!--start-code-->

```js
import { Image } from 'rsuite';

const App = () => {
  return (
    <Image
      src="https://example.com/nonexistent-image.jpg"
      fallbackSrc="https://via.placeholder.com/300x200"
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
