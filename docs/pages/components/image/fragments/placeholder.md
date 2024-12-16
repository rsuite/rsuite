<!--start-code-->

```js
import { Image, Placeholder } from 'rsuite';

const App = () => {
  return (
    <Image
      width={300}
      height={200}
      src="https://app.requestly.io/delay/2000/https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=300"
      placeholder={<Placeholder.Graph active />}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
