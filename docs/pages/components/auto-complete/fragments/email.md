<!--start-code-->

```js
import { AutoComplete } from 'rsuite';

const suffixes = ['@gmail.com', '@sina.com.cn', '@163.com', '@qq.com'];

const App = () => {
  const [data, setData] = React.useState([]);

  const handleChange = value => {
    const at = value.match(/@[\S]*/);
    const nextData = at
      ? suffixes
          .filter(item => item.indexOf(at[0]) >= 0)
          .map(item => {
            return `${value}${item.replace(at[0], '')}`;
          })
      : suffixes.map(item => `${value}${item}`);

    setData(nextData);
  };

  return (
    <AutoComplete data={data} placeholder="Email" onChange={handleChange} style={{ width: 224 }} />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
