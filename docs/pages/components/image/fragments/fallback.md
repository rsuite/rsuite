<!--start-code-->

```js
import { Image } from 'rsuite';

const App = () => {
  return (
    <Image
      src="https://example.com/nonexistent-image.jpg"
      fallbackSrc="https://placehold.co/300x200"
      alt="nonexistent-image"
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
