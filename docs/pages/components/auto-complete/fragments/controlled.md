<!--start-code-->

```js
/**
 * import { AutoComplete } from 'rsuite';
 */

const data = [
  'HYPER Advertiser',
  'HYPER Web Analytics',
  'HYPER Video Analytics',
  'HYPER DMP 中文',
  'HYPER Ad Serving',
  'HYPER Data Discovery'
];

const App = () => {
  const [value, setValue] = React.useState('');
  return <AutoComplete data={data} value={value} onChange={setValue} />;
};

ReactDOM.render(<App />);
```

<!--end-code-->
