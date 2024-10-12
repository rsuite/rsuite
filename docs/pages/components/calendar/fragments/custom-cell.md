<!--start-code-->

```js
import { Calendar } from 'rsuite';

const App = () => {
  return (
    <>
      <Styles />
      <Calendar bordered cellClassName={date => (date.getDay() % 2 ? 'bg-gray' : undefined)} />
    </>
  );
};

const Styles = () => {
  return <style>{`.bg-gray { background-color: rgba(242, 242, 242, 0.3);}`}</style>;
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
