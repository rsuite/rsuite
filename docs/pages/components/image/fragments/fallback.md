<!--start-code-->

```js
import { Image } from 'rsuite';

const App = () => {
  return (
    <Image
      src="https://app.requestly.io/delay/1000/https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=416"
      fallbackSrc="https://via.placeholder.com/416x277"
      alt="black and white short coated dog"
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
