<!--start-code-->

```js
import { Calendar } from 'rsuite';

const App = () => {
  return (
    <>
      <style>
        {`
      .bg-gray {
        background-color: rgba(242, 242, 242, 0.3);
      }
      `}
      </style>
      <Calendar bordered cellClassName={date => (date.getDay() % 2 ? 'bg-gray' : undefined)} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
